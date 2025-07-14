import type { User } from "@/interfaces/user-interface"
import { create } from "zustand"

interface AuthState {
	user: User | null
	token: string | null
	isAuthenticated: boolean
	loading: boolean
	errorMessage: string | null

	signIn: (token: string) => void;
	signOut: () => void;
	setLoading: (loading: boolean) => void;
	setErrorMessage: (message: string | null) => void;
	setUser: (user: User) => void
}

const accessToken = localStorage.getItem("x-access-token")

const useAuthStore = create<AuthState>((set) => ({
	user: null,
	token: accessToken,
	isAuthenticated: Boolean(accessToken),
	loading: false,
	errorMessage: null,

	signIn: (token) => {
		localStorage.setItem("x-access-token", token)
		set(() => ({
			user: null,
			token,
			isAuthenticated: true,
			loading: false,
			errorMessage: null
		}))
	},

	signOut: () => {
		localStorage.removeItem("x-access-token")
		set(() => ({
			user: null,
			token: null,
			isAuthenticated: false,
			loading: false,
			errorMessage: null
		}))
	},

	setLoading: (loading) => set(() => ({ loading })),

	setErrorMessage: (message) => set(() => ({ errorMessage: message })),
	setUser: (user) =>
		set(() => ({
			user
		}))
}))

export default useAuthStore
