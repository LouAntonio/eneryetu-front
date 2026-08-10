import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Chip } from '../components/Chip';
import { PageHeader } from '../components/PageHeader';
import { SectionHeading } from '../components/SectionHeading';

export function Training() {
	const { t } = useTranslation();
	const features = t('training.features', { returnObjects: true });

	return (
		<>
			<PageHeader
				eyebrow={t('training.eyebrow')}
				title={t('training.title')}
				body={t('training.body')}
			/>

			<section className="border-b border-line">
				<div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-6 py-16 lg:grid-cols-2 lg:py-20">
					<SectionHeading
						eyebrow={t('training.eyebrow')}
						title={t('training.title')}
						body={t('training.body')}
						tone="volt"
					/>
					<div className="flex flex-wrap gap-2 justify-self-start lg:pt-2">
						{features.map((feature) => (
							<Chip key={feature}>{feature}</Chip>
						))}
					</div>
				</div>
			</section>

			<section>
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<div className="rounded-3xl border-2 border-ink bg-ink-deep p-8 text-paper sm:p-12">
						<div className="flex items-center gap-3">
							<span
								aria-hidden
								className="node-live h-2.5 w-2.5 rounded-full bg-volt"
							/>
							<span className="ui-label text-volt">{t('training.eyebrow')}</span>
						</div>
						<p className="mt-6 max-w-2xl font-display text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl">
							{t('training.title')}
						</p>
						<p className="mt-4 max-w-2xl text-paper/70">{t('training.body')}</p>
						<Link
							to="/contact"
							className="mt-8 inline-block rounded-full bg-sun px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-volt"
						>
							{t('common.requestQuote')}
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
