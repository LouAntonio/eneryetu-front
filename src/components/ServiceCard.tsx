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
			className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-blue hover:shadow-[0_16px_32px_-20px_rgba(14,42,69,0.35)]"
		>
			<span
				aria-hidden
				className={`absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-blue via-sun to-volt transition-transform duration-500 ${
					revealed ? 'scale-x-100' : 'scale-x-0'
				}`}
			/>
			<h3 className="font-display text-lg font-bold tracking-tight text-ink">{title}</h3>
			<p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{blurb}</p>
			<div className="mt-6 flex items-center gap-2 border-t border-line pt-4">
				<span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-sun" />
				<span className="ui-label text-slate">{spec}</span>
			</div>
		</article>
	);
}
