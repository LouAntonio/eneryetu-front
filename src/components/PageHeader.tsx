interface PageHeaderProps {
	eyebrow: string;
	title: string;
	body?: string;
}

export function PageHeader({ eyebrow, title, body }: PageHeaderProps) {
	return (
		<section className="relative isolate overflow-hidden border-b border-line bg-paper pt-28 pb-16 sm:pb-20">
			<div aria-hidden className="absolute inset-0 -z-10 grid-light opacity-60" />
			<div className="relative mx-auto w-full max-w-6xl px-6">
				<div className="flex items-center gap-3">
					<span aria-hidden className="terminal h-2 w-2 border-blue bg-blue" />
					<span className="ui-label text-slate">{eyebrow}</span>
				</div>
				<h1 className="mt-4 max-w-3xl font-display text-6xl font-black uppercase leading-[0.92] tracking-tight text-ink sm:text-7xl">
					{title}
				</h1>
				{body ? (
					<p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">{body}</p>
				) : null}
			</div>
		</section>
	);
}
