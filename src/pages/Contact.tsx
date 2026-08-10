import { useTranslation } from 'react-i18next';

import { ContactForm } from '../components/ContactForm';
import { PageHeader } from '../components/PageHeader';

const HOUR_KEYS = ['week', 'saturday', 'sunday'] as const;

export function Contact() {
	const { t } = useTranslation();

	return (
		<>
			<PageHeader
				eyebrow={t('contact.eyebrow')}
				title={t('contact.title')}
				body={t('contact.body')}
			/>

			<section>
				<div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-6 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-20">
					<div className="space-y-10">
						<div>
							<h2 className="flex items-center gap-3 ui-label text-slate">
								<span aria-hidden className="h-2.5 w-2.5 rounded-full bg-blue" />
								{t('contact.detailsTitle')}
							</h2>
							<ul className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
								<li className="px-5 py-4">
									<span className="block ui-label text-slate">Adress</span>
									<p className="mt-1 text-sm leading-relaxed text-ink">
										{t('contact.address')}
									</p>
								</li>
								<li className="px-5 py-4">
									<span className="block ui-label text-slate">Phone</span>
									<a
										href="tel:+244923734199"
										className="mt-1 block text-sm text-ink underline decoration-volt decoration-2 underline-offset-4 transition-colors hover:text-blue"
									>
										{t('contact.phone')}
									</a>
								</li>
								<li className="px-5 py-4">
									<span className="block ui-label text-slate">Email</span>
									<a
										href="mailto:geral@eneryetu.com"
										className="mt-1 block text-sm text-ink underline decoration-volt decoration-2 underline-offset-4 transition-colors hover:text-blue"
									>
										{t('contact.email')}
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h2 className="flex items-center gap-3 ui-label text-slate">
								<span aria-hidden className="h-2.5 w-2.5 rounded-full bg-sun" />
								{t('contact.hoursTitle')}
							</h2>
							<ul className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
								{HOUR_KEYS.map((key) => (
									<li
										key={key}
										className="flex items-center justify-between px-5 py-4"
									>
										<span className="flex items-center gap-3 text-sm text-ink">
											<span
												aria-hidden
												className="h-2 w-2 shrink-0 rounded-full bg-volt"
											/>
											{t(`contact.hours.${key}.day`)}
										</span>
										<span
											className={`text-sm ${
												key === 'sunday' ? 'text-slate' : 'text-ink'
											}`}
										>
											{t(`contact.hours.${key}.time`)}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					<ContactForm />
				</div>
			</section>
		</>
	);
}
