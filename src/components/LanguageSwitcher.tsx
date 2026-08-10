import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
	{ code: 'en', label: 'EN' },
	{ code: 'pt', label: 'PT' },
] as const;

export function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const [active, setActive] = useState(() =>
		i18n.resolvedLanguage?.startsWith('pt') ? 'pt' : 'en',
	);

	const changeLanguage = (code: (typeof LANGUAGES)[number]['code']) => {
		if (code === active) return;
		setActive(code);
		void i18n.changeLanguage(code);
	};

	return (
		<div
			className="flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1"
			role="group"
			aria-label="Language"
		>
			{LANGUAGES.map(({ code, label }) => (
				<button
					key={code}
					type="button"
					onClick={() => changeLanguage(code)}
					className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
						active === code
							? 'bg-brand-600 text-white'
							: 'text-gray-600 hover:text-brand-700'
					}`}
					aria-pressed={active === code}
				>
					{label}
				</button>
			))}
		</div>
	);
}
