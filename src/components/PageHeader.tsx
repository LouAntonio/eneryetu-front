interface PageHeaderProps {
	eyebrow: string;
	title: string;
	body?: string;
}

export function PageHeader({ eyebrow, title, body }: PageHeaderProps) {
	return (
		<section className="dot-grid border-b border-line bg-paper">
			<div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
				<div className="flex items-center gap-3">
					<span aria-hidden className="h-2.5 w-2.5 bg-blue" />
					<span className="font-mono text-xs uppercase tracking-[0.22em] text-slate">
						{eyebrow}
					</span>
				</div>
				<h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
					{title}
				</h1>
				{body ? (
					<p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">{body}</p>
				) : null}
			</div>
		</section>
	);
}
