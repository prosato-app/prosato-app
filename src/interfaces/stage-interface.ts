export type StageType =
	"DRAFT" |
	"PUBLISH" |
	"IN_NEGOTIATION" |
	"EXPIRED" |
	"APPROVED" |
	"REFUSED"

export interface IStage {
	id: string
	name: string
	type: StageType
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
}
