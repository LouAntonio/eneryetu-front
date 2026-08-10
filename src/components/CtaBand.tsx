import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function CtaBand() {
	const { t } = useTranslation();

	return (
		<section>
			<div aria-hidden className="hazard h-2 w-full" />
			<div className="bg-ink text-paper">
				<div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-8 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h2 className="max-w-xl font-display text-2xl font-extrabold tracking-tight text-paper sm:text-3xl">
							{t('cta.title')}
						</h2>
						<p className="mt-3 max-w-lg text-paper/70">{t('cta.body')}</p>
					</div>
					<div className="flex flex-wrap items-center gap-4">
						<Link
							to="/contact"
							className="rounded-full bg-sun px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-volt"
						>
							{t('cta.cta')}
						</Link>
						<a
							href="tel:+244923734199"
							className="rounded-full border border-paper/30 px-6 py-3 font-display text-sm font-semibold text-paper transition-colors hover:border-volt hover:text-volt"
						>
							{t('cta.phone')}{' '}
							<span className="hidden xl:inline">+244 923 734 199</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
