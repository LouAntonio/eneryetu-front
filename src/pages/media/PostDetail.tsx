import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { assetUrl } from '../../lib/assets';
import { api } from '../../services/api';
import type { Paginated, Post } from '../../types';
import { formatDate } from './format';
import {
	BackLink,
	BoardEmpty,
	BoardLoading,
	FramePanel,
	MetaRow,
	SldCover,
	SpecRow,
	TypeChip,
} from './shared';

function estimateReadTime(content: string): number {
	const words = content.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

export function MediaPostDetail() {
	const { t, i18n } = useTranslation();
	const { slug } = useParams<{ slug: string }>();
	const locale = i18n.resolvedLanguage ?? 'en';

	const { data: post, isLoading } = useQuery({
		queryKey: ['media', 'post', slug],
		enabled: Boolean(slug),
		queryFn: async () => (await api.get<{ data: Post }>(`/posts/slug/${slug}`)).data.data,
	});

	const type = post?.type;
	const path = post?.type === 'NOTICIA' ? 'news' : 'blog';

	const { data: latest } = useQuery({
		queryKey: ['media', 'latest', type],
		enabled: Boolean(type),
		queryFn: async () =>
			(await api.get<Paginated<Post>>('/posts', { params: { limit: 4, type } })).data.data,
	});

	const minutes = useMemo(() => (post ? estimateReadTime(post.content) : 0), [post]);

	if (isLoading) {
		return <BoardLoading label={t('media.loading')} />;
	}

	if (!post) {
		return <BoardEmpty titleKey="blog" />;
	}

	const cover = assetUrl(post.coverImage);
	const name =
		post.author && (post.author.name || post.author.surname)
			? `${post.author.name ?? ''} ${post.author.surname ?? ''}`.trim()
			: null;
	const label = post.category?.name ?? t(`media.${path}.title`);
	const readTime = `${minutes} ${t('media.readingTime')}`;
	const related = (latest ?? []).filter((item) => item.id !== post.id).slice(0, 3);

	return (
		<article className="min-h-[40vh]">
			<div aria-hidden className="h-1 w-full bg-volt" />
			<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
				<BackLink to={`/media/${path}`} label={t(`media.${path}.title`)} />

				<header className="mt-8 max-w-4xl">
					<div className="flex flex-wrap items-center gap-3">
						<TypeChip>{label}</TypeChip>
						<MetaRow
							items={[
								<time key="d" dateTime={post.createdAt}>
									{formatDate(post.createdAt, locale)}
								</time>,
								...(name ? [<span key="a">{name}</span>] : []),
								<span key="r">{readTime}</span>,
							]}
						/>
					</div>
					<h1 className="mt-5 font-display text-5xl font-black uppercase leading-[0.92] tracking-tight text-ink sm:text-6xl lg:text-7xl">
						{post.title}
					</h1>
				</header>

				<div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
					<div className="min-w-0">
						<FramePanel cover={cover} className="mb-10 aspect-[16/9]">
							{!cover ? <SldCover caption={label} /> : null}
						</FramePanel>
						<div
							className="rich-content"
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>
					</div>

					<aside className="hidden lg:block">
						<div className="corner-frame sticky top-24 border border-line bg-white p-6">
							<span className="ui-label text-slate">{t('media.specTitle')}</span>
							<dl className="mt-4 divide-y divide-line border-y border-line">
								<SpecRow
									label={t('media.spec.category')}
									value={post.category?.name ?? label}
								/>
								<SpecRow
									label={t('media.spec.date')}
									value={formatDate(post.createdAt, locale)}
								/>
								<SpecRow
									label={t('media.spec.author')}
									value={name ?? 'EnerYetu'}
								/>
								<SpecRow label={t('media.spec.reading')} value={readTime} />
							</dl>
							<p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-slate">
								{t('media.live')} · {t('media.logLabel')}
							</p>
						</div>

						{related.length > 0 ? (
							<div className="mt-8">
								<span className="ui-label text-slate">{t('media.latest')}</span>
								<ul className="mt-3 divide-y divide-line border-y border-line">
									{related.map((item) => (
										<li key={item.id}>
											<Link
												to={`/media/${path}/${item.slug}`}
												className="group block py-3"
											>
												<span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-slate">
													{formatDate(item.createdAt, locale)}
												</span>
												<span className="mt-1 block font-display text-lg font-bold uppercase leading-tight tracking-tight text-ink transition-colors group-hover:text-blue-dark">
													{item.title}
												</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
						) : null}
					</aside>
				</div>
			</div>
		</article>
	);
}
