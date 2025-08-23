import type { ISigninInput, ISigninOutput } from "@/interfaces/session-interface"
import sessionService from "@/services/session-service"

const useSession = () => {
	const signIn = async (data: ISigninInput): Promise<ISigninOutput> => {
		return sessionService.signIn(data)
	}

	const signOut = async () => {
		return sessionService.signOut()
	}

	return {
		signIn,
		signOut,
		isSigningIn: false,
		isSigningOut: false,
		signInError: false,
		signOutError: false
	}
}

export default useSession
