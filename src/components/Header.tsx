import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from './LanguageSwitcher';

const NAV_KEYS = [
	'home',
	'about',
	'sectors',
	'services',
	'training',
	'media',
	'careers',
	'contact',
] as const;
const MEDIA_KEYS = ['blog', 'events', 'gallery'] as const;

type NavKey = (typeof NAV_KEYS)[number];
type MediaKey = (typeof MEDIA_KEYS)[number];

const ROUTES: Record<Exclude<NavKey, 'media'> | 'media', string> = {
	home: '/',
	about: '/about',
	sectors: '/sectors',
	services: '/services',
	training: '/training',
	media: '/media',
	careers: '/careers',
	contact: '/contact',
};

export function Header() {
	const { t } = useTranslation();
	const location = useLocation();
	const [prevPath, setPrevPath] = useState(location.pathname);
	const [open, setOpen] = useState(false);

	if (prevPath !== location.pathname) {
		setPrevPath(location.pathname);
		setOpen(false);
	}

	useEffect(() => {
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpen(false);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	const labels = {
		home: t('navigation.home'),
		about: t('navigation.about'),
		sectors: t('navigation.sectors'),
		services: t('navigation.services'),
		training: t('navigation.training'),
		media: t('navigation.media'),
		careers: t('navigation.careers'),
		contact: t('navigation.contact'),
	};
	const mediaLabels: Record<MediaKey, string> = {
		blog: t('navigation.blog'),
		events: t('navigation.events'),
		gallery: t('navigation.gallery'),
	};

	return (
		<header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-3">
				<Link to="/" className="flex items-center" aria-label={t('brand')}>
					<img src="/logo.png" alt={t('brand')} className="h-10 w-10 object-contain" />
				</Link>

				<nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
					{NAV_KEYS.map((key) =>
						key === 'media' ? (
							<div key={key} className="group relative">
								<NavLink
									to={ROUTES.media}
									className={({ isActive }) =>
										`flex items-center gap-1 border-b-2 py-1 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
											isActive
												? 'border-volt text-ink'
												: 'border-transparent text-slate hover:text-ink'
										}`
									}
								>
									{labels.media}
									<svg
										width="10"
										height="6"
										viewBox="0 0 10 6"
										aria-hidden
										className="fill-current"
									>
										<path d="M0 0h10L5 6z" />
									</svg>
								</NavLink>
								<div className="invisible absolute left-0 top-full z-20 w-52 border border-line bg-white py-2 opacity-0 shadow-sm transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
									{MEDIA_KEYS.map((child) => (
										<NavLink
											key={child}
											to={`${ROUTES.media}/${child}`}
											className={({ isActive }) =>
												`flex items-center gap-2 px-4 py-2 font-display text-xs font-medium uppercase tracking-wider transition-colors ${
													isActive
														? 'bg-paper text-ink'
														: 'text-slate hover:bg-paper hover:text-ink'
												}`
											}
										>
											<span aria-hidden className="h-1.5 w-1.5 bg-sun" />
											{mediaLabels[child]}
										</NavLink>
									))}
								</div>
							</div>
						) : (
							<NavLink
								key={key}
								to={ROUTES[key]}
								className={({ isActive }) =>
									`border-b-2 py-1 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
										isActive
											? 'border-volt text-ink'
											: 'border-transparent text-slate hover:text-ink'
									}`
								}
							>
								{labels[key]}
							</NavLink>
						),
					)}
				</nav>

				<div className="hidden lg:block">
					<LanguageSwitcher />
				</div>

				<button
					type="button"
					className="flex h-10 w-10 items-center justify-center border border-line bg-white lg:hidden"
					onClick={() => setOpen((value) => !value)}
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label={open ? t('common.menuClose') : t('common.menuOpen')}
				>
					{open ? (
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							aria-hidden
							className="fill-ink"
						>
							<path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" />
						</svg>
					) : (
						<svg
							width="18"
							height="12"
							viewBox="0 0 18 12"
							aria-hidden
							className="fill-ink"
						>
							<rect width="18" height="2" rx="1" />
							<rect y="5" width="18" height="2" rx="1" />
							<rect y="10" width="18" height="2" rx="1" />
						</svg>
					)}
				</button>
			</div>

			{open ? (
				<div id="mobile-menu" className="fixed inset-0 z-50 lg:hidden">
					<div
						className="absolute inset-0 bg-ink/60"
						onClick={() => setOpen(false)}
						aria-hidden
					/>
					<div className="absolute inset-y-0 right-0 flex w-80 max-w-[85vw] flex-col bg-ink-deep text-paper">
						<div className="flex items-center justify-between border-b border-paper/15 px-6 py-5">
							<img
								src="/logo.png"
								alt={t('brand')}
								className="h-9 w-9 object-contain"
							/>
							<button
								type="button"
								onClick={() => setOpen(false)}
								className="font-display text-xs font-semibold uppercase tracking-wider text-paper/60 transition-colors hover:text-volt"
							>
								{t('common.menuClose')}
							</button>
						</div>
						<nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobile">
							<ul className="space-y-5">
								{NAV_KEYS.map((key) =>
									key === 'media' ? (
										<li key={key}>
											<Link
												to={ROUTES.media}
												className="font-display text-2xl font-bold tracking-tight text-paper transition-colors hover:text-volt"
											>
												{labels.media}
											</Link>
											<ul className="mt-3 space-y-2 border-l border-paper/20 pl-4">
												{MEDIA_KEYS.map((child) => (
													<li key={child}>
														<Link
															to={`${ROUTES.media}/${child}`}
															className="flex items-center gap-2 font-display text-xs font-medium uppercase tracking-wider text-paper/70 transition-colors hover:text-volt"
														>
															<span
																aria-hidden
																className="h-1.5 w-1.5 bg-sun"
															/>
															{mediaLabels[child]}
														</Link>
													</li>
												))}
											</ul>
										</li>
									) : (
										<li key={key}>
											<Link
												to={ROUTES[key]}
												className="font-display text-2xl font-bold tracking-tight text-paper transition-colors hover:text-volt"
											>
												{labels[key]}
											</Link>
										</li>
									),
								)}
							</ul>
						</nav>
						<div className="border-t border-paper/15 px-6 py-5">
							<LanguageSwitcher dark />
						</div>
					</div>
				</div>
			) : null}
		</header>
	);
}
