import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { assetUrl } from '../../lib/assets';
import { api } from '../../services/api';
import type { Paginated, Post, PostType } from '../../types';
import { formatDate } from './format';
import {
	BoardEmpty,
	BoardLoading,
	FramePanel,
	MetaRow,
	SldCover,
	SldTrace,
	TypeChip,
} from './shared';

function authorName(post: Post): string | null {
	if (!post.author || (!post.author.name && !post.author.surname)) return null;
	return `${post.author.name ?? ''} ${post.author.surname ?? ''}`.trim();
}

function typePathFor(post: Pick<Post, 'type'>): 'news' | 'blog' {
	return post.type === 'NOTICIA' ? 'news' : 'blog';
}

function LeadPost({ post }: { post: Post }) {
	const { t, i18n } = useTranslation();
	const locale = i18n.resolvedLanguage ?? 'en';
	const cover = assetUrl(post.coverImage);
	const path = typePathFor(post);
	const label = post.category?.name ?? t(`media.${path}.title`);
	const name = authorName(post);

	return (
		<article className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
			<div className="flex flex-col justify-center">
				<div className="flex flex-wrap items-center gap-3">
					<TypeChip>{label}</TypeChip>
					<MetaRow
						items={[
							<time key="d" dateTime={post.createdAt}>
								{formatDate(post.createdAt, locale)}
							</time>,
							...(name ? [<span key="a">{name}</span>] : []),
						]}
					/>
				</div>
				<h2 className="mt-5 font-display text-5xl font-black uppercase leading-[0.92] tracking-tight text-ink sm:text-6xl">
					<Link
						to={`/media/${path}/${post.slug}`}
						className="transition-colors hover:text-blue-dark"
					>
						{post.title}
					</Link>
				</h2>
				{post.excerpt ? (
					<p className="mt-5 max-w-xl text-base leading-relaxed text-slate">
						{post.excerpt}
					</p>
				) : null}
				<div className="mt-7 flex flex-wrap items-center gap-6">
					<Link to={`/media/${path}/${post.slug}`} className="btn btn-mono px-5 py-2.5">
						{t('common.readMore')}
					</Link>
					<Link
						to={`/media/${path}/${post.slug}`}
						aria-label={post.title}
						className="font-display text-2xl font-black text-line transition-colors hover:text-volt"
					>
						→
					</Link>
				</div>
			</div>
			<FramePanel
				cover={cover}
				className="aspect-[16/10] min-h-[280px] lg:aspect-auto lg:h-full"
			>
				{!cover ? <SldCover caption={label} /> : null}
			</FramePanel>
		</article>
	);
}

function LedgerRow({ post }: { post: Post }) {
	const { t, i18n } = useTranslation();
	const locale = i18n.resolvedLanguage ?? 'en';
	const path = typePathFor(post);

	return (
		<li className="relative">
			<Link
				to={`/media/${path}/${post.slug}`}
				className="group relative flex flex-col gap-2 py-6 transition-colors sm:flex-row sm:items-baseline sm:gap-8"
			>
				<span
					aria-hidden
					className="absolute left-0 top-0 h-full w-1 bg-volt opacity-0 transition-opacity duration-200 group-hover:opacity-100"
				/>
				<time
					dateTime={post.createdAt}
					className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-slate sm:w-28 sm:pt-1"
				>
					{formatDate(post.createdAt, locale)}
				</time>
				<div className="min-w-0 flex-1">
					<span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-dark">
						{post.category?.name ?? t(`media.${path}.title`)}
					</span>
					<h3 className="mt-2 font-display text-2xl font-black uppercase leading-[1.05] tracking-tight text-ink transition-colors group-hover:text-blue-dark">
						{post.title}
					</h3>
					{post.excerpt ? (
						<p className="mt-2 text-sm leading-relaxed text-slate">{post.excerpt}</p>
					) : null}
				</div>
				<span
					aria-hidden
					className="hidden shrink-0 self-center font-display text-2xl font-black text-line transition-colors group-hover:text-volt sm:block"
				>
					→
				</span>
			</Link>
		</li>
	);
}

interface FeedProps {
	type: PostType;
	sectionKey: 'blog' | 'news';
}

function Feed({ type, sectionKey }: FeedProps) {
	const { t } = useTranslation();
	const { data, isLoading } = useQuery({
		queryKey: ['media', 'posts', type],
		queryFn: async () =>
			(await api.get<Paginated<Post>>('/posts', { params: { limit: 12, type } })).data.data,
	});

	if (isLoading) {
		return <BoardLoading label={t('media.loading')} />;
	}

	if (!data || data.length === 0) {
		return (
			<BoardEmpty
				titleKey={sectionKey}
				cta={{ label: t('media.ctaContact'), to: '/contact' }}
			/>
		);
	}

	const featured = data.find((post) => post.featured) ?? data[0];
	const rest = data.filter((post) => post.id !== featured.id);

	return (
		<section className="min-h-[40vh]">
			<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
				<LeadPost post={featured} />
				{rest.length > 0 ? (
					<>
						<SldTrace
							label={t('media.logLabel')}
							side={t('media.live')}
							className="mt-14"
						/>
						<ol className="mt-6 divide-y divide-line border-y border-line">
							{rest.map((post) => (
								<LedgerRow key={post.id} post={post} />
							))}
						</ol>
					</>
				) : null}
			</div>
		</section>
	);
}

export function MediaBlog() {
	return <Feed type="BLOG" sectionKey="blog" />;
}

export function MediaNews() {
	return <Feed type="NOTICIA" sectionKey="news" />;
}
