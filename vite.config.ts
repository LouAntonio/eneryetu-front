import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	
	const env = loadEnv(mode, process.cwd(), '');
	const api = env.VITE_BACKEND_URL || 'https://eneryetu.santibene.com';
	
	console.log('API URL:', api);
	
	return {
		plugins: [react(), tailwindcss()],
		server: {
			proxy: {
				'/api': {
					target: api,
					changeOrigin: true,
				},
				'/uploads': {
					target: api,
					changeOrigin: true,
				},
			},
		},
	}
});
