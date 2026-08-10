import { useTranslation } from 'react-i18next';

import { PageHeader } from '../components/PageHeader';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';

export function Services() {
	const { t } = useTranslation();
	const services = t('services.items', { returnObjects: true });
	const beyond = t('services.beyond.items', { returnObjects: true });

	return (
		<>
			<PageHeader
				eyebrow={t('services.eyebrow')}
				title={t('services.title')}
				body={t('services.body')}
			/>

			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

			<section>
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('services.beyond.eyebrow')}
						title={t('services.beyond.title')}
						body={t('services.beyond.body')}
						tone="sun"
					/>
					<div className="mt-10 grid gap-4 sm:grid-cols-3">
						{beyond.map((item) => (
							<article key={item.title} className="border border-line bg-white p-6">
								<div className="flex items-center gap-3">
									<span aria-hidden className="h-2 w-2 shrink-0 bg-sun" />
									<h2 className="font-display text-lg font-bold tracking-tight text-ink">
										{item.title}
									</h2>
								</div>
								<p className="mt-3 text-sm leading-relaxed text-slate">
									{item.blurb}
								</p>
							</article>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
