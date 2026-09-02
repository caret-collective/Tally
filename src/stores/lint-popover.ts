import { atom } from 'nanostores';
import type { Lint } from 'harper.js';

/**
 * State for the active lint popover.
 *
 * Holds the relative position, display state, and associated lint item.
 */
export const $lintPopover = atom<{
	x: number;
	y: number;
	visible: boolean;
	lint: Lint | null;
}>({
	x: 50,
	y: 50,
	visible: false,
	lint: null,
});
