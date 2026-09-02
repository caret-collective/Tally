import { atom } from 'nanostores';
import type { Lint } from 'harper.js';

/**
 * State for the active lint popover.
 *
 * Holds the relative position of the popover on the screen and associated
 * lint item, or `null` when no popover is visible.
 */
export const $lintPopover = atom<{ x: number; y: number; lint: Lint | null }>({
	x: 50,
	y: 50,
	lint: null,
});
