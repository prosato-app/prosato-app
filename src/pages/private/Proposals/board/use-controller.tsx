import useDragAndDrop from "@/pages/private/Proposals/board/useDragAndDrop.tsx"
import useBoardStore from "@/stores/board-store"
import proposeService from "@/services/propose-service"
import { useEffect } from "react"

const useController = () => {
	const {
		stages,
		loadStages
	} = useBoardStore()

	const {
		onDragCancel,
		onDragEnd,
		onDragStart,
		onDragOver,
		sensors,
		stagesWithCardIds,
		stageIds,
		handleCreateDraggableOverlay,
		collisionDetectionStrategy
	} = useDragAndDrop({
		stages,
		onCardMove: async (proposalId, fromStage, toStage, newIndex) => {
			try {
				// Get target stage proposals and sort by order
				const targetStageProposals = stages[toStage]?.proposals || []
				const sortedTargetProposals = targetStageProposals.sort((a, b) => a.order - b.order)

				// Determine the next proposal ID (the one that will come after our moved card)
				let nextProposalId: string | null = null
				if (newIndex < sortedTargetProposals.length) {
					nextProposalId = sortedTargetProposals[newIndex].id
				}

				// Get the target stage ID
				const targetStageId = stages[toStage]?.id

				if (!targetStageId) {
					return
				}

				const isSameStage = fromStage === toStage

				if (isSameStage) {
					await proposeService.changeCardOrder({
						sourceProposalId: proposalId,
						nextProposalId,
						stageId: targetStageId
					})
				} else {
					await proposeService.moveCardBetweenStages({
						sourceProposalId: proposalId,
						nextProposalId,
						targetStageId
					})
				}

				// Reload stages from backend to get updated order
				await loadStages()

			} catch (error) {
				console.error("Failed to update card:", error)
				// Reload stages from backend on error
				loadStages()
			}
		}
	})

	useEffect(() => {
		loadStages()
	}, [])

	return {
		stages,
		onDragCancel,
		onDragEnd,
		onDragOver,
		onDragStart,
		sensors,
		stageIds,
		stagesWithCardIds,
		handleCreateDraggableOverlay,
		collisionDetectionStrategy
	}
}

export default useController
