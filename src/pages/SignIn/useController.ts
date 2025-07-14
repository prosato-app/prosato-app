import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import type { ISigninInput } from "@/interfaces/session-interface"

import useSession from "@/hooks/use-session"
import useAuthStore from "@/stores/auth-state-store"

const signInSchema = z.object({
	email: z.email("Informe um e-mail válido"),
	password: z.string()
})

const useController = () => {
	const session = useSession()
	const authStore = useAuthStore()
	const navigate = useNavigate()

	const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

	const handleChangePasswordVisibility = () => {
		setIsShowPassword(!isShowPassword)
	}

	const {
		handleSubmit: hookFormSubmit,
		register,
		formState: { errors }
	} = useForm<ISigninInput>({
		resolver: zodResolver(signInSchema)
	})

	const handleSubmit = hookFormSubmit(async (input: ISigninInput) => {
		try {
			const { accessToken } = await session.signIn(input)

			authStore.signIn(accessToken)

			toast.success("Autenticado")

			navigate("/dashboard")
		} catch (error) {
			console.log(error)

			toast.error("Erro ao realizar login")
		}
	})

	return {
		handleSubmit,
		register,
		errors,
		handleChangePasswordVisibility,
		isShowPassword
	}
}

export default useController
