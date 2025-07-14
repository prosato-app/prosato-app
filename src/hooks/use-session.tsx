import type { ISigninInput, ISigninOutput } from "@/interfaces/session-interface"
import sessionService from "@/services/session-service"
import { useMutation } from "@tanstack/react-query"

const useSession = () => {
	const signInMutation = useMutation({
		mutationKey: ["signin"],
		mutationFn: (data: ISigninInput) => sessionService.signIn(data)
	})

	const signOutMutation = useMutation({
		mutationKey: ["signout"],
		mutationFn: () => sessionService.signOut()
	})

	const signIn = async (data: ISigninInput): Promise<ISigninOutput> => {
		return signInMutation.mutateAsync(data)
	}

	const signOut = async () => {
		return signOutMutation.mutateAsync()
	}

	return {
		signIn,
		signOut,
		isSigningIn: signInMutation.isPending,
		isSigningOut: signOutMutation.isPending,
		signInError: signInMutation.error,
		signOutError: signOutMutation.error
	}
}

export default useSession
