import type { ReactNode } from 'react';

interface ChipProps {
	children: ReactNode;
}

export function Chip({ children }: ChipProps) {
	return (
		<span className="inline-flex items-center gap-2 border border-line bg-white px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-ink">
			<span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-sun" />
			{children}
		</span>
	);
}
