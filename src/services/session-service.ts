import type { IRenewAccessTokenOutput, ISigninInput, ISigninOutput } from "@/interfaces/session-interface"
import ApiUtil from "@/utils/api-util"


class SessionService {
	async signIn(input: ISigninInput): Promise<ISigninOutput> {
		const response = await ApiUtil.client.post<ISigninOutput>("/sign-in", {
			email: input.email,
			password: input.password
		})

		return response.data
	}

	async signOut(): Promise<void> {
		await ApiUtil.client.post("/sign-out")
	}

	async generateNewAccessToken(): Promise<IRenewAccessTokenOutput> {
		const response = await ApiUtil.client.post<IRenewAccessTokenOutput>("/refresh-token")

		return response.data
	}
}

export default new SessionService()
