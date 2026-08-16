import { useTranslation } from 'react-i18next';

import { BoardEmpty } from './shared';

export function MediaGallery() {
	const { t } = useTranslation();

	return <BoardEmpty titleKey="gallery" cta={{ label: t('media.ctaContact'), to: '/contact' }} />;
}
