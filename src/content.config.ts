import { LOCALE } from '@config/locale.ts';
import { glob } from 'astro/loaders';
import { object } from 'astro/zod';
import { defineCollection } from 'astro:content';
import { mapEntries } from 'radashi';

/**
 * Shared Zod schema for page frontmatter across all locales.
 */
const schema = object({});

/**
 * Content collections for each supported locale.
 *
 * Each locale has its own collection to organize markdown content by language
 * (ex. src/content/en/, src/content/es/).
 */
export const collections = mapEntries(LOCALE.map, (key) => [
	key,
	defineCollection({
		loader: glob({ base: `./src/content/${key}`, pattern: '*.mdoc' }),
		schema,
	}),
]);
