import { useId } from 'react';
import { useTranslation } from 'react-i18next';

const PHASES = [62, 80, 98];

export function HeroDiagram() {
	const { t } = useTranslation();
	const labelId = useId();
	const d = {
		pv: t('hero.diagram.pv'),
		inverter: t('hero.diagram.inverter'),
		battery: t('hero.diagram.battery'),
		load: t('hero.diagram.load'),
		pvSpec: t('hero.diagram.pvSpec'),
		inverterSpec: t('hero.diagram.inverterSpec'),
		batterySpec: t('hero.diagram.batterySpec'),
		loadSpec: t('hero.diagram.loadSpec'),
		caption: t('hero.diagram.caption'),
	};

	return (
		<figure className="border border-line bg-white shadow-sm">
			<figcaption className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate">
				<span>Single-line reference — mini-grid</span>
				<span className="flex items-center gap-1.5">
					<span aria-hidden className="node-live h-1.5 w-1.5 bg-volt" />
					LIVE
				</span>
			</figcaption>

			<svg
				viewBox="0 0 520 330"
				className="hero-diagram block h-auto w-full"
				role="img"
				aria-labelledby={labelId}
			>
				<title id={labelId}>{t('hero.title')}</title>

				{/* PV modules */}
				<g>
					{PHASES.map((_, row) =>
						[40, 116].map((x) => (
							<rect
								key={`${row}-${x}`}
								x={x}
								y={row === 0 ? 48 : 100}
								width={60}
								height={36}
								rx={2}
								className="fill-paper stroke-blue"
								strokeWidth={1.2}
							/>
						)),
					)}
					{[48, 100].map((y) => (
						<path
							key={y}
							d={`M40 ${y + 8} L60 ${y + 28}`}
							className="stroke-line"
							strokeWidth={1}
						/>
					))}
				</g>

				{/* three-phase feeder PV → inverter */}
				<g>
					{PHASES.map((y) => (
						<path
							key={y}
							d={`M176 ${y} H202`}
							className="stroke-blue"
							strokeWidth={1.4}
							fill="none"
						/>
					))}
					{PHASES.map((y) => (
						<path
							key={`p-${y}`}
							d={`M176 ${y} H202`}
							className="pulse-path stroke-volt"
							strokeWidth={1.3}
							fill="none"
						/>
					))}
				</g>

				{/* inverter */}
				<rect
					x={212}
					y={56}
					width={84}
					height={48}
					rx={2}
					className="fill-blue text-white"
					fill="currentColor"
				/>
				<text x={254} y={74} textAnchor="middle" className="fill-white" fontSize={10}>
					INVERTER
				</text>
				<text x={254} y={90} textAnchor="middle" className="fill-white/75" fontSize={8}>
					{d.inverterSpec}
				</text>

				{/* output node */}
				<circle cx={254} cy={112} r={4} className="fill-sun" />
				<circle
					cx={254}
					cy={112}
					r={9}
					className="node-live fill-none stroke-sun/50"
					strokeWidth={1.4}
				/>

				{/* battery branch */}
				<path d="M254 116 V196" className="stroke-blue" strokeWidth={1.4} fill="none" />
				<path
					d="M254 116 V196"
					className="pulse-path stroke-volt"
					strokeWidth={1.3}
					fill="none"
				/>
				<rect
					x={204}
					y={196}
					width={100}
					height={40}
					rx={2}
					className="fill-paper stroke-blue"
					strokeWidth={1.2}
				/>
				<text x={254} y={212} textAnchor="middle" className="fill-ink" fontSize={8.5}>
					{d.battery}
				</text>
				<text x={254} y={226} textAnchor="middle" className="fill-slate" fontSize={8}>
					{d.batterySpec}
				</text>
				<circle cx={254} cy={196} r={3} className="fill-sun" />

				{/* AC feeder to loads */}
				<path d="M254 112 H454" className="stroke-blue" strokeWidth={1.4} fill="none" />
				<path
					d="M254 112 H454"
					className="pulse-path stroke-volt"
					strokeWidth={1.3}
					fill="none"
				/>
				<circle cx={330} cy={112} r={3} className="fill-sun" />

				{/* meter tap */}
				<path
					d="M330 112 V72"
					className="stroke-blue"
					strokeWidth={1.2}
					fill="none"
					strokeDasharray="2 3"
				/>
				<rect
					x={324}
					y={62}
					width={12}
					height={12}
					rx={1}
					className="fill-paper stroke-sun"
					strokeWidth={1.2}
				/>
				<text x={342} y={72} className="fill-slate" fontSize={8}>
					kWh
				</text>

				{/* loads */}
				<path d="M454 112 V118" className="stroke-blue" strokeWidth={1.4} fill="none" />
				<rect
					x={404}
					y={118}
					width={96}
					height={44}
					rx={2}
					className="fill-ink text-white"
				/>
				<text x={452} y={139} textAnchor="middle" className="fill-paper" fontSize={8.5}>
					{d.load}
				</text>
				<text x={452} y={153} textAnchor="middle" className="fill-paper/60" fontSize={8}>
					{d.loadSpec}
				</text>
				<circle cx={454} cy={118} r={3} className="fill-sun" />

				{/* labels */}
				<text x={40} y={158} className="fill-slate" fontSize={8}>
					{d.pv}
				</text>
				<text x={40} y={172} className="fill-ink" fontSize={8}>
					{d.pvSpec}
				</text>
			</svg>

			<figcaption className="border-t border-line px-4 py-2 font-mono text-[10px] text-slate">
				{d.caption}
			</figcaption>
		</figure>
	);
}
