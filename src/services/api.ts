import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import {
	clearTokens,
	getAccessToken,
	getRefreshToken,
	setAccessToken,
} from '../lib/authStore';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? '/api',
	timeout: 15000,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use((config) => {
	const token = getAccessToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const original = error.config as RetryConfig | undefined;
		if (!original || error.response?.status !== 401 || original._retry) {
			return Promise.reject(error);
		}

		original._retry = true;
		const refreshToken = getRefreshToken();
		if (!refreshToken) {
			clearTokens();
			return Promise.reject(error);
		}

		try {
			const { data } = await axios.post('/api/auth/refresh', { refreshToken });
			const newAccess = data.data?.accessToken;
			if (!newAccess) throw new Error('Sem access token na resposta');
			setAccessToken(newAccess);
			original.headers.Authorization = `Bearer ${newAccess}`;
			return api(original);
		} catch (refreshError) {
			clearTokens();
			return Promise.reject(refreshError);
		}
	},
);