import axios, { type AxiosInstance } from "axios"
import axiosRetry from "axios-retry"

import apiConfig from "@/config/api-config"
import sessionService from "@/services/session-service"

class ApiUtil {
	static client: AxiosInstance = axios.create({
		baseURL: apiConfig.prosatoApiUrl,
		withCredentials: true
	})

	static setup() {
		axiosRetry(ApiUtil.client, {
			retries: 5,
			retryDelay: () => 5 * 1000
		})

		ApiUtil.client.interceptors.request.use(async config => {
			const accessToken = localStorage.getItem("x-access-token")
			if (accessToken) {
				// Ensure consistent Bearer format
				config.headers.Authorization = accessToken
			}
			return config
		})

		ApiUtil.client.interceptors.response.use(
			async response => response,
			async error => {
				const originalRequest = error.config

				// Verifica se o erro é 401 (Unauthorized) e se não é uma tentativa de renovação
				if (error.response?.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true

					try {
						// Tenta gerar um novo access token
						const { accessToken } = await sessionService.generateNewAccessToken()

						// Atualiza o token no localStorage
						localStorage.setItem("x-access-token", accessToken)

						// Atualiza o header da requisição original
						originalRequest.headers.Authorization = accessToken

						// Retry da requisição original com o novo token
						return ApiUtil.client(originalRequest)
					} catch (refreshError) {
						// Se falhar ao renovar o token, limpa o localStorage e redireciona para login
						localStorage.removeItem("x-access-token")

						// Redireciona para a página de login
						window.location.href = "/sign-in"

						return Promise.reject(refreshError)
					}
				}

				return Promise.reject(error)
			}
		)
	}
}

ApiUtil.setup()

export default ApiUtil
