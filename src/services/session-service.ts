import type { ISigninInput, ISigninOutput } from "@/interfaces/session-interface"
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
}

export default new SessionService()
