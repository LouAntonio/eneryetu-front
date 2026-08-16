import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { assetUrl } from '../../lib/assets';
import { api } from '../../services/api';
import type { Event } from '../../types';
import { BackLink, BoardEmpty, BoardLoading, FramePanel, SpecRow } from './shared';

export function MediaEventDetail() {
	const { t } = useTranslation();
	const { slug } = useParams<{ slug: string }>();
	const { data: event, isLoading } = useQuery({
		queryKey: ['media', 'event', slug],
		enabled: Boolean(slug),
		queryFn: async () => (await api.get<{ data: Event }>(`/events/slug/${slug}`)).data.data,
	});

	if (isLoading) {
		return <BoardLoading label={t('media.loading')} />;
	}

	if (!event) {
		return <BoardEmpty titleKey="events" />;
	}

	const cover = assetUrl(event.coverImage);

	return (
		<article className="min-h-[40vh]">
			<div aria-hidden className="h-1 w-full bg-volt" />
			<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
				<BackLink to="/media/events" label={t('media.events.title')} />

				<header className="mt-8 max-w-4xl">
					<h1 className="font-display text-5xl font-black uppercase leading-[0.92] tracking-tight text-ink sm:text-6xl lg:text-7xl">
						{event.title}
					</h1>
					{event.subtitle ? (
						<p className="mt-3 font-mono text-sm uppercase tracking-[0.14em] text-slate">
							{event.subtitle}
						</p>
					) : null}
				</header>

				<div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
					<div className="min-w-0">
						{cover ? (
							<FramePanel cover={cover} className="mb-10 aspect-[16/9]" />
						) : null}
						{event.description ? (
							<p className="text-lg leading-relaxed text-ink">{event.description}</p>
						) : null}
						{event.fullDescription ? (
							<div
								className="rich-content mt-8"
								dangerouslySetInnerHTML={{ __html: event.fullDescription }}
							/>
						) : null}
					</div>

					<aside className="order-first lg:order-none">
						<div className="corner-frame border border-line bg-white p-6 lg:sticky lg:top-24">
							<span className="ui-label text-slate">
								{t('media.events.spec.title')}
							</span>
							<dl className="mt-4 divide-y divide-line border-y border-line">
								<SpecRow
									label={t('media.events.spec.date')}
									value={event.displayDate}
								/>
								<SpecRow
									label={t('media.events.spec.type')}
									value={event.eventType?.name}
								/>
								<SpecRow
									label={t('media.events.spec.country')}
									value={event.countryName}
								/>
								<SpecRow label={t('media.events.spec.city')} value={event.city} />
								<SpecRow label={t('media.events.spec.venue')} value={event.venue} />
							</dl>
							<Link to="/contact" className="btn btn-sun mt-6 w-full px-5 py-3">
								{t('media.events.cta')}
							</Link>
						</div>
					</aside>
				</div>
			</div>
		</article>
	);
}
