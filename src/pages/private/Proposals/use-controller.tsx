import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import ProposeService, { type CreateProposalRequest } from "@/services/propose-service.ts"
import { useNavigate } from "react-router-dom"

const createProposalSchema = z.object({
	title: z.string().nonempty({ error: "O nome é obrigatorio" }),
	expirationDate: z.date()
})

const useController = () => {
	const {
		handleSubmit: hookFormSubmit,
		register,
		formState: { errors }
	} = useForm<CreateProposalRequest>({
		resolver: zodResolver(createProposalSchema)
	})

	const navigate = useNavigate()

	const handleCreateProposal = hookFormSubmit(async (input: CreateProposalRequest) => {
		try {

			const proposalId = await ProposeService.createProposal(input)

			navigate(`/proposal-editor:${proposalId}`)

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
