import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '../../components/PageHeader';

const MEDIA_KEYS = ['blog', 'news', 'events', 'gallery'] as const;
type MediaKey = (typeof MEDIA_KEYS)[number];

export function MediaLayout() {
	const { t } = useTranslation();

	const labels: Record<MediaKey, string> = {
		blog: t('navigation.blog'),
		news: t('navigation.news'),
		events: t('navigation.events'),
		gallery: t('navigation.gallery'),
	};

	return (
		<>
			<PageHeader
				eyebrow={t('media.eyebrow')}
				title={t('media.title')}
				body={t('media.body')}
			/>

			<nav aria-label={t('navigation.media')} className="border-b border-line bg-white">
				<div className="mx-auto flex w-full max-w-6xl items-stretch gap-1 overflow-x-auto px-6">
					{MEDIA_KEYS.map((key) => (
						<NavLink
							key={key}
							to={`/media/${key}`}
							className={({ isActive }) =>
								`relative flex shrink-0 items-center px-4 py-4 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
									isActive ? 'text-ink' : 'text-slate hover:text-ink'
								}`
							}
						>
							{({ isActive }) => (
								<>
									{labels[key]}
									<span
										aria-hidden
										className={`absolute inset-x-3 bottom-0 h-1 transition-colors duration-200 ${
											isActive ? 'bg-volt' : 'bg-transparent'
										}`}
									/>
								</>
							)}
						</NavLink>
					))}
				</div>
			</nav>

			<Outlet />
		</>
	);
}
