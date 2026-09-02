import type { Lint } from 'harper.js';
import type { JSX } from 'solid-js';
import { createMemo } from 'solid-js';
import { CLASS } from './lint-card.ts';

interface Props {
	children?: JSX.Element;
	lint: Lint | null;
	lintIcon?: JSX.Element;
}

/**
 * Dynamic content for a lint card.
 *
 * @param props - Component props.
 * @returns Lint card content with kind, message, and optional header controls.
 */
export default function LintCardContent(props: Props) {
	const lintCardStyle = createMemo(() => {
		const lintKind = props.lint?.lint_kind();

		return lintKind ? `--lint-card-color: var(--${lintKind})` : undefined;
	});

	return (
		<>
			<header style={lintCardStyle()}>
				<strong class="lint-kind">
					{props.lintIcon}
					<span class={CLASS.lintKindText}>
						{props.lint?.lint_kind_pretty()}
					</span>
				</strong>
				{props.children}
			</header>
			<section>
				<div
					class={CLASS.lintMessage}
					innerHTML={props.lint?.message_html() ?? ''}
				/>
			</section>
		</>
	);
}
