import { useReveal } from '../hooks/useReveal';

export type Tone = 'blue' | 'sun' | 'volt';

interface SectionHeadingProps {
	eyebrow: string;
	title: string;
	body?: string;
	tone?: Tone;
	className?: string;
}

const NODE_COLORS: Record<Tone, string> = {
	blue: 'bg-blue',
	sun: 'bg-sun',
	volt: 'bg-volt',
};

export function SectionHeading({
	eyebrow,
	title,
	body,
	tone = 'blue',
	className = '',
}: SectionHeadingProps) {
	const { ref, revealed } = useReveal<HTMLDivElement>();

	return (
		<div ref={ref} className={className}>
			<div className="flex items-center gap-3">
				<span
					aria-hidden
					className={`h-2.5 w-2.5 shrink-0 transition-colors duration-500 ${
						revealed ? NODE_COLORS[tone] : 'bg-line'
					}`}
				/>
				<span className="font-mono text-xs uppercase tracking-[0.22em] text-slate">
					{eyebrow}
				</span>
				<span
					aria-hidden
					className={`trace h-0.5 min-w-8 flex-1 ${revealed ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
				/>
			</div>
			<h2 className="mt-4 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
				{title}
			</h2>
			{body ? (
				<p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">{body}</p>
			) : null}
		</div>
	);
}
