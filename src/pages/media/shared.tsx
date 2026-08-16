import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function TypeChip({
	children,
	tone = 'blue',
}: {
	children: ReactNode;
	tone?: 'blue' | 'sun';
}) {
	return (
		<span
			className={`inline-flex items-center border px-2 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] ${
				tone === 'sun'
					? 'border-sun-deep/50 text-sun-deep'
					: 'border-blue/40 bg-white text-blue-dark'
			}`}
		>
			{children}
		</span>
	);
}

export function MetaRow({ items, className = '' }: { items: ReactNode[]; className?: string }) {
	return (
		<div
			className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-slate ${className}`}
		>
			{items.map((item, index) => (
				<Fragment key={index}>
					{index > 0 ? (
						<span aria-hidden className="text-slate/40">
							·
						</span>
					) : null}
					{item}
				</Fragment>
			))}
		</div>
	);
}

export function SldTrace({
	label,
	side,
	className = '',
}: {
	label?: string;
	side?: string;
	className?: string;
}) {
	return (
		<div aria-hidden className={`flex items-center gap-4 ${className}`}>
			{label ? <span className="ui-label whitespace-nowrap text-slate">{label}</span> : null}
			<svg viewBox="0 0 200 24" fill="none" className="h-6 min-w-0 flex-1">
				<path d="M4 16 H84" strokeWidth="2" strokeDasharray="4 4" className="stroke-blue" />
				<circle cx="99" cy="16" r="4" className="fill-sun" />
				<path
					d="M116 16 H196"
					strokeWidth="2"
					strokeDasharray="4 4"
					className="stroke-sun"
				/>
				<path d="M116 16 H196" strokeWidth="1.6" className="pulse-path stroke-volt" />
			</svg>
			{side ? <span className="ui-label whitespace-nowrap text-slate">{side}</span> : null}
		</div>
	);
}

export function SldCover({ caption }: { caption?: string }) {
	return (
		<div aria-hidden className="absolute inset-0 grid place-items-center p-8">
			<div className="w-full max-w-xs">
				<svg viewBox="0 0 240 72" fill="none" className="w-full">
					<path
						d="M8 36 H104"
						strokeWidth="2.5"
						strokeDasharray="6 6"
						className="stroke-blue"
					/>
					<circle
						cx="120"
						cy="36"
						r="18"
						strokeWidth="1"
						strokeDasharray="3 3"
						className="stroke-blue opacity-60"
					/>
					<circle cx="120" cy="36" r="9" className="fill-sun" />
					<path
						d="M136 36 H232"
						strokeWidth="2.5"
						strokeDasharray="6 6"
						className="stroke-sun"
					/>
					<path d="M136 36 H232" strokeWidth="1.8" className="pulse-path stroke-volt" />
				</svg>
				{caption ? <p className="ui-label mt-6 text-center text-slate">{caption}</p> : null}
			</div>
		</div>
	);
}

interface FramePanelProps {
	cover?: string | null;
	children?: ReactNode;
	className?: string;
}

export function FramePanel({ cover, children, className = '' }: FramePanelProps) {
	return (
		<div
			className={`corner-frame relative overflow-hidden border border-line bg-white ${className}`}
		>
			{cover ? (
				<img src={cover} alt="" className="h-full w-full object-cover" />
			) : (
				<div aria-hidden className="absolute inset-0 grid-light opacity-70" />
			)}
			{children}
		</div>
	);
}

export function BoardLoading({ label }: { label: string }) {
	return (
		<section className="min-h-[40vh]">
			<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
				<div className="flex items-center gap-3 border border-line bg-white px-5 py-6">
					<span aria-hidden className="node-live h-2 w-2 rounded-full bg-blue" />
					<span className="font-mono text-xs uppercase tracking-[0.16em] text-slate">
						{label}
					</span>
				</div>
			</div>
		</section>
	);
}

interface BoardEmptyProps {
	titleKey: 'blog' | 'news' | 'events' | 'gallery';
	cta?: { label: string; to: string };
}

export function BoardEmpty({ titleKey, cta }: BoardEmptyProps) {
	const { t } = useTranslation();
	const section = t(`media.${titleKey}`, { returnObjects: true });

	return (
		<section className="min-h-[40vh]">
			<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
				<div className="corner-frame relative overflow-hidden border border-line bg-white p-8 sm:p-12">
					<div aria-hidden className="absolute inset-0 grid-light opacity-60" />
					<div className="relative max-w-2xl">
						<SldTrace label={section.title} className="mb-8" />
						<h1 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink">
							{section.emptyTitle}
						</h1>
						<p className="mt-4 leading-relaxed text-slate">{section.emptyBody}</p>
						{cta ? (
							<Link to={cta.to} className="btn btn-mono mt-8 px-5 py-2.5">
								{cta.label}
							</Link>
						) : null}
					</div>
				</div>
			</div>
		</section>
	);
}

export function BackLink({ to, label }: { to: string; label: string }) {
	return (
		<Link
			to={to}
			className="inline-flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate transition-colors hover:text-ink"
		>
			<span aria-hidden className="text-volt">
				←
			</span>
			{label}
		</Link>
	);
}

export function SpecRow({ label, value }: { label: string; value?: string | null }) {
	return (
		<div className="grid grid-cols-[7.5rem_1fr] gap-4 py-3">
			<dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-slate">
				{label}
			</dt>
			<dd className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-ink">
				{value || '—'}
			</dd>
		</div>
	);
}
