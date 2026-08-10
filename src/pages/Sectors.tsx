import { useTranslation } from 'react-i18next';

import { PageHeader } from '../components/PageHeader';

export function Sectors() {
	const { t } = useTranslation();
	const sectors = t('sectors.items', { returnObjects: true });

	return (
		<>
			<PageHeader
				eyebrow={t('sectors.eyebrow')}
				title={t('sectors.title')}
				body={t('sectors.body')}
			/>

			<section className="border-t-0">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{sectors.map((sector) => (
							<article
								key={sector.title}
								className="group relative flex flex-col border border-line bg-white p-6 transition-colors hover:border-blue"
							>
								<span
									aria-hidden
									className="absolute inset-x-0 top-0 h-0.5 origin-left bg-sun transition-transform duration-500 group-hover:scale-x-100"
								/>
								<div className="flex items-center justify-between">
									<h2 className="font-display text-lg font-bold tracking-tight text-ink">
										{sector.title}
									</h2>
									<span
										aria-hidden
										className="h-1.5 w-1.5 bg-sun transition-colors group-hover:bg-volt"
									/>
								</div>
								<p className="mt-3 text-sm leading-relaxed text-slate">
									{sector.blurb}
								</p>
							</article>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
