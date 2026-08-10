import { useTranslation } from 'react-i18next';

export function Home() {
	const { t } = useTranslation();

	return (
		<main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
			<h1 className="max-w-3xl text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
				{t('hero.title')}
			</h1>
			<p className="max-w-2xl text-lg leading-relaxed text-gray-600">{t('hero.subtitle')}</p>
			<a
				href="#solutions"
				className="rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
			>
				{t('hero.cta')}
			</a>
		</main>
	);
}
