import type {
	ChangeCardOrderRequest,
	CreateProposal,
	MoveCardBetweenStagesRequest,
	RetrieveProposalsOutput,
	StagesFormattedForList
} from "@/interfaces/propose-interface"
import ApiUtil from "@/utils/api-util"

export type CreateProposalRequest = {
	title: string
	expirationDate: Date
}

export type CreateProposalResponse = {
	proposalId: string
}

class ProposeService {
	async getProposes(): Promise<StagesFormattedForList> {
		const response = await ApiUtil.client.get<RetrieveProposalsOutput>("/proposal")

		return response.data.stages
	}

	async createProposal(input: CreateProposalRequest): Promise<string> {
		const response = await ApiUtil.client.post<CreateProposalResponse>("/proposal", {
			...input,
			expirationDate: new Date()
		})

		return response.data.proposalId
	}

	async changeCardOrder(input: ChangeCardOrderRequest): Promise<void> {
		await ApiUtil.client.put("/proposal/change-card-order", input)
	}

	async moveCardBetweenStages(input: MoveCardBetweenStagesRequest): Promise<void> {
		await ApiUtil.client.put("/proposal/move-card-between-stages", input)
	}
}

export default new ProposeService
