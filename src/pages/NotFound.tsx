import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function NotFound() {
	const { t } = useTranslation();

	return (
		<section className="dot-grid flex min-h-[60vh] items-center">
			<div className="mx-auto w-full max-w-6xl px-6 py-24 text-center">
				<div aria-hidden className="hazard mx-auto h-2 w-24" />
				<h1 className="mt-10 font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
					{t('notFound.title')}
				</h1>
				<p className="mx-auto mt-5 max-w-xl text-lg text-slate">{t('notFound.body')}</p>
				<Link
					to="/"
					className="mt-10 inline-block rounded-full bg-sun px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-volt"
				>
					{t('notFound.cta')}
				</Link>
			</div>
		</section>
	);
}
