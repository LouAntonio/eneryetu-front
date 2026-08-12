import { useTranslation } from 'react-i18next';

import { PageHeader } from '../components/PageHeader';
import { SectionHeading } from '../components/SectionHeading';

export function Careers() {
	const { t } = useTranslation();
	const positions = t('careers.positions', { returnObjects: true });

	return (
		<>
			<PageHeader
				eyebrow={t('careers.eyebrow')}
				title={t('careers.title')}
				body={t('careers.body')}
			/>

			<section>
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('careers.eyebrow')}
						title={t('careers.positionsTitle')}
						tone="sun"
					/>

					<div className="mt-10 divide-y divide-line border-y border-line">
						{positions.map((position, index) => (
							<article
								key={position.title}
								className="group grid gap-4 bg-white px-5 py-6 transition-colors hover:bg-ink sm:grid-cols-[1fr_auto] sm:items-center"
							>
								<div>
									<div className="flex items-center gap-3">
										<span className="font-mono text-xs text-blue">
											{`T-${String(index + 1).padStart(2, '0')}`}
										</span>
										<h2 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-ink transition-colors group-hover:text-paper">
											{position.title}
										</h2>
									</div>
									<p className="mt-2 ui-label text-slate transition-colors group-hover:text-paper/60">
										{position.meta}
									</p>
									<p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate transition-colors group-hover:text-paper/70">
										{position.blurb}
									</p>
								</div>
								<a
									href={`mailto:geral@eneryetu.com?subject=${encodeURIComponent(position.title)}`}
									className="btn btn-mono justify-self-start px-5 py-2.5 sm:justify-self-end"
								>
									{t('common.apply')}
								</a>
							</article>
						))}
					</div>

					<p className="mt-10 font-mono text-sm text-slate">
						{t('careers.applyLabel')}{' '}
						<a
							href="mailto:geral@eneryetu.com"
							className="text-ink underline decoration-volt decoration-2 underline-offset-4 transition-colors hover:text-blue"
						>
							geral@eneryetu.com
						</a>
					</p>
					<p className="mt-2 font-mono text-xs text-slate/70">{t('careers.applyHint')}</p>
				</div>
			</section>
		</>
	);
}
