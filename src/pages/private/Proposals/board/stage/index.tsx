import type { StageType } from "@/interfaces/stage-interface"
import Card from "@/pages/private/Proposals/board/stage/card"
import customStyles from "@/styles/customStyles"
import type { UniqueIdentifier } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import useController from "@/pages/private/Proposals/board/stage/use-controller.tsx"
import type { Items } from "@/pages/private/Proposals/board/useDragAndDrop"

type StageProps = {
	containerId: UniqueIdentifier
	items: Items
}

const Stage = (props: StageProps) => {
	const {
		containerId,
		items
	} = props

	const {
		sortable
	} = useController({
		containerId,
		containerItems: items[containerId]
	})

	const { setNodeRef: setDroppableRef, isOver } = useDroppable({
		id: containerId,
		data: {
			type: "container",
			accepts: ["card"]
		}
	})

	const stageTypeToColor: Record<StageType, string> = {
		APPROVED: customStyles.colors.success[100],
		DRAFT: customStyles.colors.warning[100],
		EXPIRED: customStyles.colors.error[100],
		IN_NEGOTIATION: customStyles.colors.neutral[400],
		PUBLISH: customStyles.colors.primary[100],
		REFUSED: customStyles.colors.error[500]
	}

	const stageTypeToStageTitle: Record<StageType, string> = {
		APPROVED: "Aprovado",
		DRAFT: "Rascunho",
		EXPIRED: "Expirado",
		IN_NEGOTIATION: "Em Negociação",
		PUBLISH: "Publicado",
		REFUSED: "Recusado"
	}

	return (
		<div
			className="min-w-[360px] h-full border rounded-2xl overflow-hidden flex flex-col flex-nowrap"
			style={{
				border: `1px solid ${customStyles.colors.neutral[400]}`,
				transition: sortable.transition,
				transform: sortable.transform,
				opacity: sortable.isDragging ? 0.5 : undefined
			}}
			ref={sortable.setNodeRef}
		>
			<div
				className="w-full h-2/12 flex items-center justify-center"
				style={{ background: stageTypeToColor[containerId as StageType], borderBottom: `1px solid ${customStyles.colors.neutral[400]}` }}
			>
				<h4 className="text-2xl font-medium">{stageTypeToStageTitle[containerId as StageType]}</h4>
			</div>
			<div
				className="min-w-0 h-full p-2 gap-2 flex flex-col overflow-x-hidden overflow-y-auto flex-nowrap"
				ref={setDroppableRef}
				style={{
					backgroundColor: isOver ? "rgba(59, 130, 246, 0.1)" : undefined,
					minHeight: "200px"
				}}
			>
				<SortableContext
					items={items[containerId]}
					strategy={verticalListSortingStrategy}
				>
					{items[containerId].map((cardId) => (
						<Card
							key={cardId}
							id={cardId}
							containerId={containerId}
							isOverlay={false}
						/>
					))}
				</SortableContext>
			</div>
		</div>
	)
}

export default Stage
