import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Chip } from '../components/Chip';
import { CtaBand } from '../components/CtaBand';
import { HeroDiagram } from '../components/HeroDiagram';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { StatRow } from '../components/StatRow';

export function Home() {
	const { t } = useTranslation();
	const stats = t('stats.rows', { returnObjects: true });
	const services = t('services.items', { returnObjects: true });
	const sectors = t('sectors.items', { returnObjects: true });
	const points = t('intro.points', { returnObjects: true });
	const trainingFeatures = t('training.features', { returnObjects: true });

	return (
		<>
			{/* HERO */}
			<section className="dot-grid border-b border-line bg-paper">
				<div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
					<div>
						<div className="flex items-center gap-3">
							<span aria-hidden className="h-2.5 w-2.5 rounded-full bg-blue" />
							<span className="ui-label text-slate">{t('hero.eyebrow')}</span>
						</div>
						<h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
							{t('hero.title')}
						</h1>
						<p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
							{t('hero.lede')}
						</p>
						<div className="mt-8 flex flex-wrap items-center gap-4">
							<Link
								to="/contact"
								className="rounded-full bg-sun px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-volt"
							>
								{t('hero.ctaPrimary')}
							</Link>
							<Link
								to="/services"
								className="font-display text-sm font-semibold text-ink underline decoration-volt decoration-2 underline-offset-4 transition-colors hover:text-blue"
							>
								{t('hero.ctaSecondary')}
							</Link>
						</div>
					</div>

					<HeroDiagram />
				</div>
			</section>

			{/* STATS */}
			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('stats.eyebrow')}
						title={t('stats.title')}
						tone="sun"
					/>
					<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{stats.map((row) => (
							<StatRow key={row.label} value={row.value} label={row.label} />
						))}
					</div>
				</div>
			</section>

			{/* WHO WE ARE */}
			<section className="border-b border-line">
				<div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
					<SectionHeading
						eyebrow={t('intro.eyebrow')}
						title={t('intro.title')}
						body={t('intro.body')}
					/>
					<div className="flex flex-col justify-end">
						<div className="overflow-hidden rounded-2xl border border-line bg-white">
							<div className="border-b border-line px-6 py-3 ui-label text-slate">
								Scope of work
							</div>
							<ul className="divide-y divide-line px-6">
								{points.map((point) => (
									<li key={point} className="flex items-center gap-3 py-4">
										<span
											aria-hidden
											className="h-2 w-2 shrink-0 rounded-full bg-sun"
										/>
										<span className="font-display text-sm font-semibold uppercase tracking-wider text-ink">
											{point}
										</span>
									</li>
								))}
							</ul>
						</div>
						<Link
							to="/about"
							className="mt-6 justify-self-start font-display text-sm font-semibold text-ink underline decoration-volt decoration-2 underline-offset-4 transition-colors hover:text-blue"
						>
							{t('intro.cta')}
						</Link>
					</div>
				</div>
			</section>

			{/* SERVICES */}
			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-24">
					<div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
						<SectionHeading
							eyebrow={t('services.eyebrow')}
							title={t('services.title')}
							body={t('services.body')}
							tone="blue"
						/>
						<Link
							to="/services"
							className="shrink-0 font-display text-sm font-semibold text-ink underline decoration-volt decoration-2 underline-offset-4 transition-colors hover:text-blue"
						>
							{t('common.exploreServices')}
						</Link>
					</div>
					<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{services.map((service) => (
							<ServiceCard
								key={service.title}
								title={service.title}
								blurb={service.blurb}
								spec={service.spec}
							/>
						))}
					</div>
				</div>
			</section>

			{/* SECTORS */}
			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-24">
					<SectionHeading
						eyebrow={t('sectors.eyebrow')}
						title={t('sectors.title')}
						body={t('sectors.body')}
						tone="sun"
					/>
					<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{sectors.map((sector) => (
							<Link
								key={sector.title}
								to="/sectors"
								className="group rounded-2xl border border-line bg-white p-6 transition-colors hover:border-blue"
							>
								<div className="flex items-center justify-between">
									<h3 className="font-display text-lg font-bold tracking-tight text-ink">
										{sector.title}
									</h3>
									<span
										aria-hidden
										className="h-2 w-2 rounded-full bg-sun transition-colors group-hover:bg-volt"
									/>
								</div>
								<p className="mt-2 text-sm leading-relaxed text-slate">
									{sector.blurb}
								</p>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* TRAINING */}
			<section className="border-b border-line bg-ink-deep text-paper">
				<div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
					<div>
						<SectionHeading
							eyebrow={t('training.eyebrow')}
							title={t('training.title')}
							tone="volt"
							className="text-paper [&_h2]:text-paper"
						/>
						<p className="mt-4 max-w-xl text-paper/70">{t('training.body')}</p>
						<div className="mt-6 flex flex-wrap gap-2">
							{trainingFeatures.map((feature) => (
								<Chip key={feature}>{feature}</Chip>
							))}
						</div>
					</div>
					<div className="justify-self-start lg:justify-self-end">
						<div className="rounded-2xl border border-paper/25 bg-paper/5 p-8">
							<div className="flex items-center gap-3">
								<span
									aria-hidden
									className="node-live h-2.5 w-2.5 rounded-full bg-volt"
								/>
								<span className="ui-label text-volt">Field-proven</span>
							</div>
							<p className="mt-4 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
								{t('training.cta')}
							</p>
							<Link
								to="/training"
								className="mt-6 inline-block rounded-full bg-sun px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-volt"
							>
								{t('common.learnMore')}
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* PARTNERS */}
			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 text-center">
					<p className="ui-label text-slate">{t('partners.eyebrow')}</p>
					<h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
						{t('partners.title')}
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-slate">{t('partners.body')}</p>
				</div>
			</section>

			<CtaBand />
		</>
	);
}
