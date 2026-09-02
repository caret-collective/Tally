import LintCardContent from '@components/app/home/LintCard/LintCardContent.tsx';
import { $lintPopover } from '@stores/lint-popover.ts';
import { useStore } from '@nanostores/solid';
import type { JSX } from 'solid-js';
import { createEffect, createMemo } from 'solid-js';
import { clearLintPopover } from './lint-popover-client.ts';
import { ID } from './lint-popover.ts';

interface Props {
	closeIcon?: JSX.Element;
	lintIcon?: JSX.Element;
}

/**
 * Reactive lint popover showing the active Harper lint.
 *
 * Reads popover state from Nano Stores, positions the anchor in viewport
 * percentage units, and uses the Popover API to mirror the active lint state.
 *
 * @param props - Static icon slots passed from Astro.
 * @returns A hydrated popover and its anchor.
 */
export default function LintPopover(props: Props) {
	const popoverState = useStore($lintPopover);
	const lint = createMemo(() => popoverState().lint);

	// Handle popover positioning and visibility
	createEffect(() => {
		const { x, y, visible } = popoverState();
		const lintPopover = document.getElementById(ID.lintPopover);
		const lintPopoverAnchor = document.getElementById(ID.lintPopoverAnchor);

		if (!lintPopover || !lintPopoverAnchor) return;

		if (visible && lint()) {
			lintPopoverAnchor.style.left = `${x}%`;
			lintPopoverAnchor.style.top = `${y}%`;
			lintPopover.showPopover();

			return;
		}

		lintPopover.hidePopover();
	});

	return (
		<LintCardContent lint={lint()} lintIcon={props.lintIcon}>
			<div class="io-group">
				<button
					aria-label="Close"
					class="button"
					title="Close"
					type="button"
					onClick={clearLintPopover}
				>
					{props.closeIcon}
				</button>
			</div>
		</LintCardContent>
	);
}
