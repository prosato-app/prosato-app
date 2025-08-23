import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import type { CreateProposal } from "@/interfaces/propose-interface.ts"
import ProposeService from "@/services/propose-service.ts"

const createProposalSchema = z.object({
	title: z.string().nonempty({ error: "O nome é obrigatorio" })
})

const useController = () => {
	const {
		handleSubmit: hookFormSubmit,
		register,
		formState: { errors }
	} = useForm<CreateProposal>({
		resolver: zodResolver(createProposalSchema)
	})

	const handleCreateProposal = hookFormSubmit(async (input: CreateProposal) => {
		try {

			await ProposeService.createProposal(input)

			toast.success("Autenticado")
		} catch (error) {
			console.log(error)

			toast.error("Erro ao realizar login")
		}
	})

	return {
		handleCreateProposal,
		register,
		errors
	}
}

export default useController
