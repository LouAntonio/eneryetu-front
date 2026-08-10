import { Link, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Home } from './pages/Home';

const NAV_ITEMS = ['about', 'solutions', 'projects', 'contact'] as const;

function App() {
	const { t } = useTranslation();

	return (
		<div className="flex min-h-screen flex-col bg-gray-50">
			<header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
				<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
					<Link to="/" className="flex items-center gap-3">
						<img src="/logo.png" alt={t('brand')} className="h-9 w-9 object-contain" />
						<span className="text-xl font-bold text-brand-700">{t('brand')}</span>
					</Link>

					<nav className="hidden items-center gap-8 md:flex">
						{NAV_ITEMS.map((key) => (
							<Link
								key={key}
								to="/"
								className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-700"
							>
								{t(`nav.${key}`)}
							</Link>
						))}
					</nav>

					<LanguageSwitcher />
				</div>
			</header>

			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>

			<footer className="border-t border-gray-200 bg-white">
				<div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 sm:flex-row">
					<p className="text-sm text-gray-500">
						{t('brand')} © {new Date().getFullYear()}
					</p>
					<p className="text-sm text-gray-500">{t('tagline')}</p>
					<p className="text-sm text-gray-400">{t('footer.rights')}</p>
				</div>
			</footer>
		</div>
	);
}

export default App;
