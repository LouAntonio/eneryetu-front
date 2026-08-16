import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { api } from '../../services/api';
import type { Event, Paginated } from '../../types';
import { BoardEmpty, BoardLoading, TypeChip } from './shared';

function EventNameplate({ event, index }: { event: Event; index: number }) {
	const { t, i18n } = useTranslation();
	const locale = i18n.resolvedLanguage ?? 'en';
	const date = new Date(event.startDate);
	const month = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
	const year = date.getFullYear();
	const featured = index === 0;
	const location = [event.countryName, event.city, event.venue].filter(Boolean).join(' · ');

	return (
		<li>
			<Link
				to={`/media/events/${event.slug}`}
				className="group corner-frame grid gap-6 border border-line bg-white p-6 transition-colors hover:border-blue/50 sm:grid-cols-[7.5rem_minmax(0,1fr)_auto] sm:items-center sm:p-8"
			>
				<div className="flex items-baseline gap-3 sm:block">
					<span className="font-display text-6xl font-black uppercase leading-none tracking-tight text-ink tabular-nums">
						{String(date.getDate()).padStart(2, '0')}
					</span>
					<span className="mt-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-slate">
						{month} {year}
					</span>
				</div>
				<div className="min-w-0">
					<div className="flex flex-wrap items-center gap-3">
						<TypeChip tone={featured ? 'sun' : 'blue'}>
							{event.eventType?.name ?? t('media.events.title')}
						</TypeChip>
						{location ? (
							<span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-slate">
								{location}
							</span>
						) : null}
					</div>
					<h3 className="mt-3 font-display text-2xl font-black uppercase leading-[1.05] tracking-tight text-ink transition-colors group-hover:text-blue-dark">
						{event.title}
					</h3>
					{event.subtitle ? (
						<p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate">
							{event.subtitle}
						</p>
					) : null}
					{event.description ? (
						<p className="mt-3 text-sm leading-relaxed text-slate">
							{event.description}
						</p>
					) : null}
				</div>
				<span
					aria-hidden
					className="hidden justify-self-end font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate transition-colors group-hover:text-volt sm:block"
				>
					{t('common.readMore')} →
				</span>
			</Link>
		</li>
	);
}

export function MediaEvents() {
	const { t } = useTranslation();
	const { data, isLoading } = useQuery({
		queryKey: ['media', 'events'],
		queryFn: async () =>
			(await api.get<Paginated<Event>>('/events', { params: { limit: 12 } })).data.data,
	});

	if (isLoading) {
		return <BoardLoading label={t('media.loading')} />;
	}

	if (!data || data.length === 0) {
		return (
			<BoardEmpty titleKey="events" cta={{ label: t('media.ctaContact'), to: '/contact' }} />
		);
	}

	return (
		<section className="min-h-[40vh]">
			<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
				<div className="flex items-center gap-3 pb-3">
					<span className="ledger-head border-0 pb-0">{t('media.events.title')}</span>
					<span aria-hidden className="h-px flex-1 bg-line" />
					<span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-blue-dark tabular-nums">
						{data.length}
					</span>
				</div>
				<ul className="mt-6 grid gap-5">
					{data.map((event, index) => (
						<EventNameplate key={event.id} event={event} index={index} />
					))}
				</ul>
			</div>
		</section>
	);
}
