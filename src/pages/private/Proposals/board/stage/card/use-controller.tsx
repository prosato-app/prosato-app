import { useSortable } from "@dnd-kit/sortable"
import type { UniqueIdentifier } from "@dnd-kit/core"
import useBoardStore from "@/stores/board-store"
import type { StageType } from "@/interfaces/stage-interface"
import { useNavigate } from "react-router-dom"

type UseControllerProps = {
	cardId: UniqueIdentifier
	containerId: UniqueIdentifier
}

const useController = (props: UseControllerProps) => {
	const { cardId, containerId } = props
	const {
		setNodeRef,
		listeners,
		isDragging,
		active,
		transform,
		transition,
		attributes,
		over
	} = useSortable({
		id: cardId,
		data: {
			type: "card",
			containerId
		}
	})

	const navigate = useNavigate()

	const {
		stages
	} = useBoardStore()

	const getCardInfo = () => {
		// Search for the card in all stages since it might have been moved
		for (const stageType of Object.keys(stages) as StageType[]) {
			const cardInfo = stages[stageType]?.proposals?.find(proposal => proposal.id === cardId)
			if (cardInfo) {
				return cardInfo
			}
		}
		return null
	}

	const handleRedirectToEditProposal = () => {
		navigate(`/proposal-editor/${cardInfo?.id}`)
	}

	const handleDeleteProposal = () => {
		console.log(1)
	}

	const cardInfo = getCardInfo()

	return {
		cardInfo,
		sortable: {
			setNodeRef,
			listeners,
			isDragging,
			transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(${transform.scaleX}) scaleY(${transform.scaleY})` : undefined,
			transition: transition ? transition : undefined,
			attributes,
			active,
			over
		},
		handleRedirectToEditProposal,
		handleDeleteProposal
	}
}

export default useController
