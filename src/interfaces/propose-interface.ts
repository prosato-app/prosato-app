import type { StageType } from "@/interfaces/stage-interface"

export type StagesFormattedForList = Record<StageType, {
	id: string
	name: string
	type: StageType
	proposals: Array<{
		id: string
		title?: string
		expirationDate?: Date
		price?: number
		priority?: string
		order: number
	}>
}>

export type RetrieveProposalsOutput = {
	stages: StagesFormattedForList
}

export type CreateProposal = {
	title: string
}

export type ChangeCardOrderRequest = {
	sourceProposalId: string
	nextProposalId: string | null
	stageId: string
}

export type MoveCardBetweenStagesRequest = {
	sourceProposalId: string
	nextProposalId: string | null
	targetStageId: string
}

