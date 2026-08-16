import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { PageHeader } from '../components/PageHeader';
import { assetUrl } from '../lib/assets';
import { api } from '../services/api';
import type { Event, Paginated, Post, PostType } from '../types';

const MEDIA_KEYS = ['blog', 'news', 'events', 'gallery'] as const;
type MediaKey = (typeof MEDIA_KEYS)[number];

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});
}

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
							{labels[key]}
						</NavLink>
					))}
				</div>
			</nav>

			<Outlet />
		</>
	);
}

interface EmptySectionProps {
	titleKey: 'blog' | 'news' | 'events' | 'gallery';
}

function EmptySection({ titleKey }: EmptySectionProps) {
	const { t } = useTranslation();
	const section = t(`media.${titleKey}`, { returnObjects: true });

	return (
		<section className="min-h-[40vh]">
			<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
				<div className="relative isolate overflow-hidden border border-line bg-white p-8 sm:p-12">
					<div aria-hidden className="absolute inset-0 -z-10 grid-light opacity-50" />
					<span className="ui-label text-slate">{section.title}</span>
					<h1 className="mt-4 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink">
						{section.emptyTitle}
					</h1>
					<p className="mt-4 max-w-2xl leading-relaxed text-slate">{section.emptyBody}</p>
				</div>
			</div>
		</section>
	);
}

function PostCard({ post }: { post: Post }) {
	const { t } = useTranslation();
	const cover = assetUrl(post.coverImage);
	const typePath = post.type === 'NOTICIA' ? 'news' : 'blog';

	return (
		<Link
			to={`/media/${typePath}/${post.slug}`}
			className="group block border border-line bg-white transition-colors hover:border-blue/50"
		>
			{cover ? (
				<img src={cover} alt="" className="aspect-[16/9] w-full object-cover" />
			) : (
				<div aria-hidden className="grid-light aspect-[16/9] w-full opacity-60" />
			)}
			<div className="p-6">
				<div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate">
					<span className="text-blue">
						{post.category?.name ?? t(`media.${typePath}.title`)}
					</span>
					<span aria-hidden className="text-slate/40">
						·
					</span>
					<time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
				</div>
				<h2 className="mt-3 font-display text-2xl font-black uppercase leading-[1.05] tracking-tight text-ink transition-colors group-hover:text-blue-dark">
					{post.title}
				</h2>
				{post.excerpt ? (
					<p className="mt-3 text-sm leading-relaxed text-slate">{post.excerpt}</p>
				) : null}
				<span className="mt-4 inline-block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate underline decoration-line underline-offset-4 transition-colors group-hover:text-volt">
					{t('common.readMore')}
				</span>
			</div>
		</Link>
	);
}

function EventCard({ event }: { event: Event }) {
	const { t } = useTranslation();
	const cover = assetUrl(event.coverImage);

	return (
		<Link
			to={`/media/events/${event.slug}`}
			className="group block border border-line bg-white transition-colors hover:border-blue/50"
		>
			{cover ? (
				<img src={cover} alt="" className="aspect-[16/9] w-full object-cover" />
			) : (
				<div aria-hidden className="grid-light aspect-[16/9] w-full opacity-60" />
			)}
			<div className="p-6">
				<div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate">
					<span className="text-blue">
						{event.eventType?.name ?? t('media.events.title')}
					</span>
					<span aria-hidden className="text-slate/40">
						·
					</span>
					<span>{event.displayDate}</span>
					{event.countryName ? (
						<span aria-hidden className="text-slate/40">
							·
						</span>
					) : null}
					{event.countryName ? <span>{event.countryName}</span> : null}
				</div>
				<h2 className="mt-3 font-display text-2xl font-black uppercase leading-[1.05] tracking-tight text-ink transition-colors group-hover:text-blue-dark">
					{event.title}
				</h2>
				<p className="mt-3 text-sm leading-relaxed text-slate">{event.description}</p>
				<span className="mt-4 inline-block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate underline decoration-line underline-offset-4 transition-colors group-hover:text-volt">
					{t('common.readMore')}
				</span>
			</div>
		</Link>
	);
}

function PostFeed({ type, sectionKey }: { type: PostType; sectionKey: 'blog' | 'news' }) {
	const { t } = useTranslation();
	const { data, isLoading } = useQuery({
		queryKey: ['media', 'posts', type],
		queryFn: async () =>
			(
				await api.get<Paginated<Post>>('/posts', {
					params: { limit: 12, type },
				})
			).data.data,
	});

	if (isLoading) {
		return (
			<section className="min-h-[40vh]">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<div className="flex items-center gap-3 border border-line bg-white px-5 py-6">
						<span aria-hidden className="node-live h-2 w-2 rounded-full bg-blue" />
						<span className="font-mono text-xs uppercase tracking-[0.16em] text-slate">
							{t('media.loading')}
						</span>
					</div>
				</div>
			</section>
		);
	}

	if (!data || data.length === 0) {
		return <EmptySection titleKey={sectionKey} />;
	}

	return (
		<section className="min-h-[40vh]">
			<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{data.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			</div>
		</section>
	);
}

export function MediaBlog() {
	return <PostFeed type="BLOG" sectionKey="blog" />;
}

export function MediaNews() {
	return <PostFeed type="NOTICIA" sectionKey="news" />;
}

export function MediaEvents() {
	const { t } = useTranslation();
	const { data, isLoading } = useQuery({
		queryKey: ['media', 'events'],
		queryFn: async () =>
			(await api.get<Paginated<Event>>('/events', { params: { limit: 12 } })).data.data,
	});

	if (isLoading) {
		return (
			<section className="min-h-[40vh]">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<div className="flex items-center gap-3 border border-line bg-white px-5 py-6">
						<span aria-hidden className="node-live h-2 w-2 rounded-full bg-blue" />
						<span className="font-mono text-xs uppercase tracking-[0.16em] text-slate">
							{t('media.loading')}
						</span>
					</div>
				</div>
			</section>
		);
	}

	if (!data || data.length === 0) {
		return <EmptySection titleKey="events" />;
	}

	return (
		<section className="min-h-[40vh]">
			<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{data.map((event) => (
						<EventCard key={event.id} event={event} />
					))}
				</div>
			</div>
		</section>
	);
}

export function MediaGallery() {
	return <EmptySection titleKey="gallery" />;
}

export function MediaPostDetail() {
	const { t } = useTranslation();
	const { slug } = useParams<{ slug: string }>();
	const { data: post, isLoading } = useQuery({
		queryKey: ['media', 'post', slug],
		enabled: Boolean(slug),
		queryFn: async () => (await api.get<{ data: Post }>(`/posts/slug/${slug}`)).data.data,
	});

	if (isLoading) {
		return (
			<section className="min-h-[40vh]">
				<div className="mx-auto w-full max-w-3xl px-6 py-16 lg:py-20">
					<div className="flex items-center gap-3 border border-line bg-white px-5 py-6">
						<span aria-hidden className="node-live h-2 w-2 rounded-full bg-blue" />
						<span className="font-mono text-xs uppercase tracking-[0.16em] text-slate">
							{t('media.loading')}
						</span>
					</div>
				</div>
			</section>
		);
	}

	if (!post) {
		return <EmptySection titleKey="blog" />;
	}

	const cover = assetUrl(post.coverImage);
	const typePath = post.type === 'NOTICIA' ? 'news' : 'blog';
	const authorName =
		post.author && (post.author.name || post.author.surname)
			? `${post.author.name} ${post.author.surname}`.trim()
			: null;

	return (
		<article className="min-h-[40vh]">
			<div className="mx-auto w-full max-w-3xl px-6 py-16 lg:py-20">
				<Link
					to={`/media/${typePath}`}
					className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate transition-colors hover:text-ink"
				>
					← {t(`media.${typePath}.title`)}
				</Link>

				<div className="mt-8 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate">
					<span className="text-blue">
						{post.category?.name ?? t(`media.${typePath}.title`)}
					</span>
					<span aria-hidden className="text-slate/40">
						·
					</span>
					<time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
					{authorName ? (
						<>
							<span aria-hidden className="text-slate/40">
								·
							</span>
							<span>{authorName}</span>
						</>
					) : null}
				</div>

				<h1 className="mt-4 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink">
					{post.title}
				</h1>

				{cover ? (
					<img
						src={cover}
						alt=""
						className="mt-8 w-full border border-line object-cover"
					/>
				) : null}

				<div
					className="rich-content mt-8"
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
			</div>
		</article>
	);
}

export function MediaEventDetail() {
	const { t } = useTranslation();
	const { slug } = useParams<{ slug: string }>();
	const { data: event, isLoading } = useQuery({
		queryKey: ['media', 'event', slug],
		enabled: Boolean(slug),
		queryFn: async () => (await api.get<{ data: Event }>(`/events/slug/${slug}`)).data.data,
	});

	if (isLoading) {
		return (
			<section className="min-h-[40vh]">
				<div className="mx-auto w-full max-w-3xl px-6 py-16 lg:py-20">
					<div className="flex items-center gap-3 border border-line bg-white px-5 py-6">
						<span aria-hidden className="node-live h-2 w-2 rounded-full bg-blue" />
						<span className="font-mono text-xs uppercase tracking-[0.16em] text-slate">
							{t('media.loading')}
						</span>
					</div>
				</div>
			</section>
		);
	}

	if (!event) {
		return <EmptySection titleKey="events" />;
	}

	const cover = assetUrl(event.coverImage);

	return (
		<article className="min-h-[40vh]">
			<div className="mx-auto w-full max-w-3xl px-6 py-16 lg:py-20">
				<Link
					to="/media/events"
					className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate transition-colors hover:text-ink"
				>
					← {t('media.events.title')}
				</Link>

				<div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate">
					<span className="text-blue">
						{event.eventType?.name ?? t('media.events.title')}
					</span>
					<span aria-hidden className="text-slate/40">
						·
					</span>
					<span>{event.displayDate}</span>
					<span aria-hidden className="text-slate/40">
						·
					</span>
					<span>
						{event.countryName}
						{event.city ? `, ${event.city}` : ''}
					</span>
				</div>

				<h1 className="mt-4 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink">
					{event.title}
				</h1>
				{event.subtitle ? (
					<p className="mt-4 font-mono text-sm uppercase tracking-[0.14em] text-slate">
						{event.subtitle}
					</p>
				) : null}

				{cover ? (
					<img
						src={cover}
						alt=""
						className="mt-8 w-full border border-line object-cover"
					/>
				) : null}

				<p className="mt-8 text-lg leading-relaxed text-ink">{event.description}</p>

				{event.venue ? (
					<p className="mt-4 font-mono text-sm text-slate">
						{t('media.events.venue')}: {event.venue}
					</p>
				) : null}

				{event.fullDescription ? (
					<div
						className="rich-content mt-8"
						dangerouslySetInnerHTML={{ __html: event.fullDescription }}
					/>
				) : null}
			</div>
		</article>
	);
}
