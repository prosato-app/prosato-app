import type { StagesFormattedForList } from "@/interfaces/propose-interface"
import type { StageType } from "@/interfaces/stage-interface"
import type { Items } from "@/pages/private/Proposals/board/useDragAndDrop"
import type { UniqueIdentifier } from "@dnd-kit/core"

export function mountStagesWithCardIds(stages: StagesFormattedForList): { items: Items, stageIds: UniqueIdentifier[] } {
	const items: Items = {}
	const stageIds: UniqueIdentifier[] = []

	Object.entries(stages).forEach(([stageType, stageData]) => {
		const stageKey = stageType as StageType
		items[stageKey] = []
		stageIds.push(stageKey)

		if (stageData?.proposals && Array.isArray(stageData.proposals)) {
			// Sort proposals by order parameter before adding to items
			const sortedProposals = stageData.proposals.sort((a, b) => a.order - b.order)
			sortedProposals.forEach(proposal => {
				items[stageKey].push(proposal.id)
			})
		}
	})

	return { items, stageIds }
}
