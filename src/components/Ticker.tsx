import { useTranslation } from 'react-i18next';

export function Ticker() {
	const { t } = useTranslation();

	return (
		<div className="bg-ink text-paper">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-2 font-mono text-[11px] tracking-wide text-paper/70">
				<p className="truncate">{t('ticker.hours')}</p>
				<a
					href="tel:+244923734199"
					className="hidden shrink-0 transition-colors hover:text-volt sm:block"
				>
					{t('ticker.phones')}
				</a>
				<a
					href="mailto:geral@eneryetu.com"
					className="hidden shrink-0 transition-colors hover:text-volt lg:block"
				>
					{t('ticker.email')}
				</a>
			</div>
		</div>
	);
}
