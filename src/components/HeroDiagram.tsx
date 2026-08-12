import { useId } from 'react';
import { useTranslation } from 'react-i18next';

const PHASES = [60, 84, 108];

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
		<figure className="overflow-hidden border border-paper/15 bg-ink-deep/85 backdrop-blur-sm">
			<figcaption className="flex items-center justify-between gap-3 border-b border-paper/15 px-4 py-2.5 ui-label text-paper/65">
				<span>Scheme · single line — mini-grid</span>
				<span className="flex items-center gap-2 text-volt">
					<span aria-hidden className="node-live h-2 w-2 bg-volt" />
					LIVE
				</span>
			</figcaption>

			<svg
				viewBox="0 0 560 300"
				className="hero-diagram block h-auto w-full"
				role="img"
				aria-labelledby={labelId}
			>
				<title id={labelId}>{t('hero.title')}</title>

				{/* PV array */}
				<g>
					{[46, 102].map((y) =>
						[24, 84].map((x) => (
							<rect
								key={`${x}-${y}`}
								x={x}
								y={y}
								width={48}
								height={40}
								rx={0}
								className="fill-transparent stroke-blue"
								strokeWidth={1.4}
							/>
						)),
					)}
					<path d="M34 62 L60 88" className="stroke-paper/25" strokeWidth={1} />
					<path d="M92 62 L118 88" className="stroke-paper/25" strokeWidth={1} />
				</g>

				{/* feeders PV → inverter */}
				<g>
					{PHASES.map((y) => (
						<path
							key={y}
							d={`M132 ${y + 8} H168`}
							className="stroke-blue"
							strokeWidth={1.2}
							fill="none"
						/>
					))}
					{PHASES.map((y) => (
						<path
							key={`p-${y}`}
							d={`M132 ${y + 8} H168`}
							className="pulse-path stroke-volt"
							strokeWidth={1.1}
							fill="none"
						/>
					))}
				</g>

				{/* inverter */}
				<rect x={178} y={46} width={72} height={44} className="fill-blue" />
				<text
					x={214}
					y={66}
					textAnchor="middle"
					className="fill-white font-mono"
					style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em' }}
				>
					INVERTER
				</text>
				<text
					x={214}
					y={80}
					textAnchor="middle"
					className="fill-white/70 font-mono"
					style={{ fontSize: 7.5 }}
				>
					{d.inverterSpec}
				</text>

				{/* output node */}
				<circle cx={214} cy={104} r={3.5} className="fill-sun" />
				<circle
					cx={214}
					cy={104}
					r={8}
					className="node-live fill-none stroke-sun/60"
					strokeWidth={1.2}
				/>

				{/* battery branch */}
				<path d="M214 112 V184" className="stroke-blue" strokeWidth={1.2} fill="none" />
				<path
					d="M214 112 V184"
					className="pulse-path stroke-volt"
					strokeWidth={1.1}
					fill="none"
				/>
				<rect
					x={168}
					y={184}
					width={92}
					height={34}
					rx={0}
					className="fill-transparent stroke-sun"
					strokeWidth={1.3}
				/>
				<text
					x={214}
					y={199}
					textAnchor="middle"
					className="fill-paper font-mono"
					style={{ fontSize: 8 }}
				>
					{d.battery}
				</text>
				<text
					x={214}
					y={212}
					textAnchor="middle"
					className="fill-slate font-mono"
					style={{ fontSize: 7.5 }}
				>
					{d.batterySpec}
				</text>

				{/* bus → meter tap → loads */}
				<path d="M214 104 H340" className="stroke-blue" strokeWidth={1.2} fill="none" />
				<path
					d="M214 104 H340"
					className="pulse-path stroke-volt"
					strokeWidth={1.1}
					fill="none"
				/>

				<circle cx={276} cy={104} r={2.5} className="fill-sun" />
				<path
					d="M276 104 V62"
					className="stroke-sun"
					strokeWidth={1}
					fill="none"
					strokeDasharray="2 3"
				/>
				<rect
					x={270}
					y={52}
					width={12}
					height={12}
					rx={0}
					className="fill-transparent stroke-sun"
					strokeWidth={1.2}
				/>
				<text x={286} y={62} className="fill-slate font-mono" style={{ fontSize: 7.5 }}>
					kWh
				</text>

				{/* loads */}
				<rect x={340} y={62} width={96} height={44} className="fill-paper" />
				<text
					x={388}
					y={80}
					textAnchor="middle"
					className="fill-ink font-mono"
					style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: '0.08em' }}
				>
					{d.load}
				</text>
				<text
					x={388}
					y={92}
					textAnchor="middle"
					className="fill-slate font-mono"
					style={{ fontSize: 7.5 }}
				>
					{d.loadSpec}
				</text>

				{/* labels */}
				<text x={28} y={48} className="fill-paper/70 font-mono" style={{ fontSize: 7.5 }}>
					{d.pv}
				</text>
				<text x={28} y={162} className="fill-paper font-mono" style={{ fontSize: 7.5 }}>
					{d.pvSpec}
				</text>
			</svg>

			<figcaption className="border-t border-paper/15 px-4 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-paper/50">
				{d.caption}
			</figcaption>
		</figure>
	);
}
