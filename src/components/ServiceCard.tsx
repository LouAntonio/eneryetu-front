import { useReveal } from '../hooks/useReveal';

interface ServiceCardProps {
	title: string;
	blurb: string;
	spec: string;
}

export function ServiceCard({ title, blurb, spec }: ServiceCardProps) {
	const { ref, revealed } = useReveal<HTMLDivElement>();

	return (
		<article
			ref={ref}
			className="group relative flex flex-col border border-line bg-white p-6 transition-colors hover:border-blue"
		>
			<span
				aria-hidden
				className={`absolute inset-x-0 top-0 h-0.5 origin-left bg-sun transition-transform duration-500 ${
					revealed ? 'scale-x-100' : 'scale-x-0'
				}`}
			/>
			<h3 className="font-display text-lg font-bold tracking-tight text-ink">{title}</h3>
			<p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{blurb}</p>
			<div className="mt-6 flex items-center gap-2 border-t border-line pt-4">
				<span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-volt" />
				<span className="font-mono text-[11px] uppercase tracking-wider text-slate">
					{spec}
				</span>
			</div>
		</article>
	);
}
