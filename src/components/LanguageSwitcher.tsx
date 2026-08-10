import { useTranslation } from 'react-i18next';

const LANGUAGES = ['en', 'pt'] as const;

interface LanguageSwitcherProps {
	dark?: boolean;
}

export function LanguageSwitcher({ dark = false }: LanguageSwitcherProps) {
	const { i18n } = useTranslation();
	const active = i18n.language?.startsWith('pt') ? 'pt' : 'en';

	const changeLanguage = (code: (typeof LANGUAGES)[number]) => {
		if (code === active) return;
		void i18n.changeLanguage(code);
	};

	const tone = dark ? 'border-paper/20 bg-paper/5 text-paper' : 'border-line bg-white text-ink';

	return (
		<div
			className={`flex items-center gap-0.5 rounded-full border p-1 font-display text-xs font-semibold uppercase tracking-wider ${tone}`}
			role="group"
			aria-label="Language"
		>
			{LANGUAGES.map((code) => {
				const isActive = active === code;
				return (
					<button
						key={code}
						type="button"
						onClick={() => changeLanguage(code)}
						aria-pressed={isActive}
						className={`rounded-full px-2.5 py-1 transition-colors ${
							isActive
								? 'bg-sun text-ink'
								: dark
									? 'text-paper/60 hover:text-volt'
									: 'text-slate hover:text-ink'
						}`}
					>
						{code.toUpperCase()}
					</button>
				);
			})}
		</div>
	);
}
