interface StatRowProps {
	value: string;
	label: string;
}

export function StatRow({ value, label }: StatRowProps) {
	return (
		<div className="rounded-2xl border border-line bg-white p-6">
			<div className="font-display text-4xl font-extrabold tracking-tight text-ink tabular-nums">
				{value}
			</div>
			<div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
				<span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-sun" />
				<span className="ui-label text-slate">{label}</span>
			</div>
		</div>
	);
}
