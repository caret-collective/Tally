import { INPUT } from '@config/input.ts';
import { persistentAtom } from '@nanostores/persistent';
import { atom, map } from 'nanostores';
import type { LintChunkMap, RangeIndices } from '@type/linting.ts';
import { $option } from './options.ts';

/**
 * The input text saved to localStorage.
 *
 * Only used when `rememberInputText` is true.
 */
export const $persistedInputText = persistentAtom<string>(
	INPUT.id,
	INPUT.defaultValue,
);

/**
 * The current text input and its visible range.
 *
 * Initialized from `persistedInputText` if `rememberInputText` is enabled,
 * otherwise uses the default empty value.
 */
export const $input = atom<{
	text: string;
	visibleRangeIndices: RangeIndices;
}>(
	(() => {
		const text = $option.rememberInputText.get()
			? $persistedInputText.get()
			: INPUT.defaultValue;

		return {
			text,
			visibleRangeIndices: [0, text.length],
		};
	})(),
);

/**
 * Computed lint chunks for the current input.
 */
export const $lintChunkMap = map<LintChunkMap>({
	visible: {
		start: 0,
		lints: [],
	},
	trailing: undefined,
	leading: undefined,
});
