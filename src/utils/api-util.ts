import axios, { type AxiosInstance } from "axios"
import axiosRetry from "axios-retry"

import apiConfig from "@/config/api-config"

class ApiUtil {
	static client: AxiosInstance = axios.create({
		baseURL: apiConfig.prosatoApiUrl,
		withCredentials: true
	})

	static setup() {
		console.log(apiConfig.prosatoApiUrl)
		axiosRetry(ApiUtil.client, {
			retries: 5,
			retryDelay: () => 5 * 1000
		})

		ApiUtil.client.interceptors.request.use(async config => {
			return config
		})

		ApiUtil.client.interceptors.response.use(async requestConfig => requestConfig, async error => {
			return Promise.reject(error)
		})
	}
}

ApiUtil.setup()

export default ApiUtil
