import { $lintPopover } from '@stores/lint-popover.ts';
import type { Lint } from 'harper.js';

/**
 * Updates the lint popover position and content.
 *
 * Opens the popover for a new lint at the given viewport coordinates,
 * or hides it when the same lint is selected again or no lint is provided.
 *
 * @param lint - Lint to display.
 * @param clientX - Viewport X coordinate.
 * @param clientY - Viewport Y coordinate.
 */
export async function updateLintPopover(
	lint: Lint | undefined,
	clientX: number,
	clientY: number,
) {
	const currentPopover = $lintPopover.get();

	// If the user clicks on the same lint again or their click doesn't intersect a lint range, hide the popover
	if (!lint || (currentPopover.visible && lint === currentPopover.lint)) {
		clearLintPopover();

		return;
	}

	console.debug('Updating lint popover');

	const { clientWidth, clientHeight } = document.documentElement;

	// Using a relative position allows the viewport to be resized without needing to recalculate the position of the popover
	$lintPopover.set({
		x: (clientX / clientWidth) * 100,
		y: (clientY / clientHeight) * 100,
		visible: true,
		lint,
	});
}

/**
 * Clears the lint popover state.
 *
 * Hides the popover without clearing its rendered lint content to prevent layout shifts.
 */
export function clearLintPopover() {
	console.debug('Clearing lint popover');

	const { lint } = $lintPopover.get();

	$lintPopover.set({
		x: 50,
		y: 50,
		visible: false,
		lint,
	});
}
