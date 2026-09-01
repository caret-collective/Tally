import { CLASS } from '@config/class.ts';
import { INPUT } from '@config/input.ts';
import type { OutputId } from '@config/output.ts';
import { $outputCounts } from '@stores/output.ts';
import { wKey } from '@utils/dom.ts';
import { useStore } from '@nanostores/solid';
import type { ComponentProps } from 'solid-js';
import { createEffect, createMemo, splitProps } from 'solid-js';

interface Props extends Omit<ComponentProps<'output'>, 'id'> {
	id: OutputId;
	currentLocaleId: string;
	placeholder: string;
}

/**
 * Reactive output element for one computed text statistic.
 *
 * Reads the shared output counts store, formats the matching value for the
 * current locale, and restarts the pulse animation when that value changes.
 *
 * @param props - Component props.
 * @returns A hydrated output element displaying the current statistic value.
 */
export default function Output(props: Props) {
	const [local, outputProps] = splitProps(props, [
		'id',
		'currentLocaleId',
		'placeholder',
		'class',
	]);
	const outputCounts = useStore($outputCounts);
	const numberFormatter = new Intl.NumberFormat(local.currentLocaleId);
	const value = createMemo(() => outputCounts()?.[local.id]);
	const formattedValue = createMemo(() => {
		const currentValue = value();

		return currentValue ? numberFormatter.format(currentValue) : local.placeholder;
	});

	let outputElement!: HTMLOutputElement;

	// Animate changing values
	createEffect((lastValue: number | undefined) => {
		const currentValue = value();

		// Skip the animation if nothing's changed
		if (currentValue === lastValue) return currentValue;

		outputElement.classList.remove(CLASS.outputUpdateAnimation);

		// Force a reflow so removing and re-adding the class restarts the CSS animation
		void outputElement.offsetWidth;

		outputElement.classList.add(CLASS.outputUpdateAnimation);

		return currentValue;
	}, undefined);

	return (
		<output
			{...outputProps}
			{...wKey(local.id, 'output')}
			ref={outputElement}
			id={local.id}
			name={local.id}
			for={INPUT.id}
			class={local.class}
		>
			{formattedValue()}
		</output>
	);
}
