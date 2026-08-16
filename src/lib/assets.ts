const API_ORIGIN = import.meta.env.VITE_API_URL ? new URL(import.meta.env.VITE_API_URL).origin : '';

export function assetUrl(path?: string | null): string | null {
	if (!path) return null;
	if (/^https?:\/\//.test(path)) return path;
	return `${API_ORIGIN}/uploads/${path.replace(/^\/+/, '')}`;
}
