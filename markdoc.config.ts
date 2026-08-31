import {
	defineMarkdocConfig,
	nodes,
	component,
} from '@astrojs/markdoc/config';
import Markdoc, {
	type Config,
	type Node,
	type ValidationError,
} from '@markdoc/markdoc';
import { SITE } from '@config/site.ts';
import { URL } from '@config/url.ts';
import { assert, get, isString } from 'radashi';

/**
 * Resolves a variable reference or returns the input string as-is.
 *
 * Variable references start with `$` followed by a dot-notation path (e.g., `$some.variable`).
 * If the input starts with `$`, the function looks up the corresponding value in the provided
 * object using the path after the `$`. Otherwise, it returns the input unchanged.
 *
 * Used in Markdoc files to resolve dynamic variable references.
 *
 * @param obj - The object containing variables to resolve against
 * @param variableOrString - Either a variable reference (e.g., `$some.variable`) or a plain string
 * @returns The resolved string value from the object, or the original string if not a variable reference
 *
 * @throws {AssertionError} If `obj` is undefined
 * @throws {AssertionError} If a variable reference doesn't exist in the object
 * @throws {AssertionError} If a variable reference resolves to a non-string value
 *
 * @example
 * const data = { some: { variable: 'hello' } };
 * resolveVariable(data, '$some.variable'); // Returns: 'hello'
 * resolveVariable(data, 'plain text');     // Returns: 'plain text'
 */
function resolveVariable(
	obj: Record<string, unknown> | undefined,
	variableOrString: string,
) {
	assert(obj, 'Object is required by resolveVariable');

	if (variableOrString.startsWith('$')) {
		const value = get(obj, variableOrString.slice(1));

		assert(value, `Variable '${variableOrString}' does not exist`);
		assert(isString(value), `Variable '${variableOrString}' is not a string`);

		return value;
	}

	return variableOrString;
}

/**
 * Validates text nodes to detect potential undefined reference-style links.
 *
 * In Markdown, reference-style links use the format `[text][ref]` where `[ref]`
 * must be defined elsewhere. If a reference appears without a definition, it will
 * be rendered as plain text like `[ref]`. This validator catches these cases.
 *
 * @param node - The text node to validate
 * @returns Array of validation errors if an undefined reference is detected, empty array otherwise
 *
 * @example
 * // This would trigger an error:
 * // "Check out [my link][undefined-ref]"
 * // Result: "[undefined-ref]" has no definition
 */
function validateTextNode(node: Node): ValidationError[] {
	const content = node.attributes.content;

	if (isString(content) && content.startsWith('[') && content.endsWith(']')) {
		return [
			{
				id: 'text-content',
				level: 'error',
				message: `Possible reference-style link '${content}' has no definition.`,
			},
		];
	}

	return [];
}

/**
 * Markdoc attribute type that resolves string variables in URL-like props.
 *
 * Markdown link URLs parse as plain strings, while tag attributes can parse as
 * Markdoc variables. Accept both during validation, then resolve `$...` strings
 * against the Markdoc config variables during transform.
 */
class VariableString {
	validate(value: unknown): ValidationError[] {
		if (isString(value) || Markdoc.Ast.isVariable(value)) {
			return [];
		}

		return [
			{
				id: 'attribute-type-invalid',
				level: 'error',
				message: 'Attribute must be a string or variable.',
			},
		];
	}

	transform(value: string, config: Config) {
		return resolveVariable(config.variables, value);
	}
}

const documentNode = { ...nodes.document };

delete documentNode.render;

export default defineMarkdocConfig({
	variables: {
		site: SITE,
		url: URL,
	},
	nodes: {
		document: documentNode,
		text: {
			...nodes.text,
			validate: validateTextNode,
		},
		link: {
			...nodes.link,
			render: component('@components/ui/Link.astro'),
			attributes: {
				...nodes.link.attributes,
				href: {
					...nodes.link.attributes?.href,
					type: VariableString,
				},
			},
		},
		strong: {
			...nodes.strong,
			render: component('@components/ui/Strong.astro'),
		},
		blockquote: {
			...nodes.blockquote,
			render: component('@components/ui/Alert.astro'),
		},
		image: {
			...nodes.image,
			render: component('@components/ui/Image.astro'),
		},
	},
	tags: {
		bdo: {
			render: component('@components/ui/Bdo.astro'),
			attributes: {
				dir: {
					type: String,
					matches: ['ltr', 'rtl'],
				},
			},
		},
		licenseButtonLink: {
			render: component('@components/app/LicenseButtonLink.astro'),
			attributes: {
				to: {
					type: VariableString,
					required: true,
				},
				label: {
					type: String,
				},
			},
		},
	},
});
