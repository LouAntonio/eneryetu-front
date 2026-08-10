interface StatRowProps {
	value: string;
	label: string;
}

export function StatRow({ value, label }: StatRowProps) {
	return (
		<div className="border border-line bg-white p-6">
			<div className="font-display text-4xl font-extrabold tracking-tight text-ink">
				{value}
			</div>
			<div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
				<span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-sun" />
				<span className="font-mono text-[11px] uppercase tracking-wider text-slate">
					{label}
				</span>
			</div>
		</div>
	);
}
