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
								`border-b-2 py-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-colors ${
									isActive
										? 'border-volt text-ink'
										: 'border-transparent text-slate hover:text-ink'
								}`
							}
						>
							{({ isActive }) => (
								<span className="flex items-center gap-2">
									<span
										aria-hidden
										className={`terminal h-1.5 w-1.5 ${
											isActive ? 'border-volt bg-volt' : 'border-sun'
										}`}
									/>
									{labels[key]}
								</span>
							)}
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
				<div className="relative isolate overflow-hidden border border-line bg-white p-8 sm:p-12">
					<div aria-hidden className="absolute inset-0 -z-10 grid-light opacity-50" />
					<div className="flex items-center gap-3">
						<span aria-hidden className="terminal h-2 w-2 border-blue bg-blue" />
						<span className="ui-label text-slate">{section.title}</span>
					</div>
					<h1 className="mt-4 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink">
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
