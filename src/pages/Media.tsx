import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '../components/PageHeader';

const MEDIA_KEYS = ['blog', 'events', 'gallery'] as const;

export function MediaLayout() {
	const { t } = useTranslation();

	const labels = {
		blog: t('navigation.blog'),
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

			<nav className="border-b border-line bg-white" aria-label={t('navigation.media')}>
				<div className="mx-auto flex w-full max-w-6xl items-center gap-8 px-6">
					{MEDIA_KEYS.map((key) => (
						<NavLink
							key={key}
							to={`/media/${key}`}
							className={({ isActive }) =>
								`border-b-2 py-4 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
									isActive
										? 'border-volt text-ink'
										: 'border-transparent text-slate hover:text-ink'
								}`
							}
						>
							{labels[key]}
						</NavLink>
					))}
				</div>
			</nav>

			<Outlet />
		</>
	);
}

interface MediaChildProps {
	titleKey: 'blog' | 'events' | 'gallery';
}

function MediaChild({ titleKey }: MediaChildProps) {
	const { t } = useTranslation();
	const section = t(`media.${titleKey}`, { returnObjects: true });

	return (
		<section className="min-h-[40vh]">
			<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
				<div className="rounded-2xl border border-line bg-white p-8 sm:p-12">
					<div className="flex items-center gap-3">
						<span aria-hidden className="h-2.5 w-2.5 rounded-full bg-blue" />
						<span className="ui-label text-slate">{section.title}</span>
					</div>
					<h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink">
						{section.emptyTitle}
					</h1>
					<p className="mt-4 max-w-2xl leading-relaxed text-slate">{section.emptyBody}</p>
				</div>
			</div>
		</section>
	);
}

export function MediaBlog() {
	return <MediaChild titleKey="blog" />;
}

export function MediaEvents() {
	return <MediaChild titleKey="events" />;
}

export function MediaGallery() {
	return <MediaChild titleKey="gallery" />;
}
