import type { ChangeCardOrderRequest, CreateProposal, MoveCardBetweenStagesRequest, RetrieveProposalsOutput, StagesFormattedForList } from "@/interfaces/propose-interface"
import ApiUtil from "@/utils/api-util"


class ProposeService {
	async getProposes(): Promise<StagesFormattedForList> {
		const response = await ApiUtil.client.get<RetrieveProposalsOutput>("/proposal")

		return response.data.stages
	}

	async createProposal(input: CreateProposal): Promise<object> {
		const response = await ApiUtil.client.post("/proposal", {
			...input,
			expirationDate: new Date()
		})

		return response.data
	}

	async changeCardOrder(input: ChangeCardOrderRequest): Promise<void> {
		await ApiUtil.client.put("/proposal/change-card-order", input)
	}

	async moveCardBetweenStages(input: MoveCardBetweenStagesRequest): Promise<void> {
		await ApiUtil.client.put("/proposal/move-card-between-stages", input)
	}
}

export default new ProposeService
