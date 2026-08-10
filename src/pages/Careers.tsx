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
						{positions.map((position) => (
							<article
								key={position.title}
								className="grid gap-4 bg-white px-6 py-6 sm:grid-cols-[1fr_auto] sm:items-center"
							>
								<div>
									<h2 className="font-display text-lg font-bold tracking-tight text-ink">
										{position.title}
									</h2>
									<p className="mt-1 ui-label text-slate">{position.meta}</p>
									<p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">
										{position.blurb}
									</p>
								</div>
								<a
									href={`mailto:geral@eneryetu.com?subject=${encodeURIComponent(position.title)}`}
									className="justify-self-start rounded-full border border-line bg-sun px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-volt sm:justify-self-end"
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
