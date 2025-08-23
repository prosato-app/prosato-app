import Tag from "@/components/Tag"
import customStyles from "@/styles/customStyles"
import {
	Calendar as ExpirationDateIcon,
	User as ClientIcon,
	DollarSign as ProposalCostIcon,
	EllipsisVertical as MoreOptionsMenuIcon,
	Flag as PriorityIcon
} from "lucide-react"
import type { UniqueIdentifier } from "@dnd-kit/core"
import useController from "@/pages/private/Proposals/board/stage/card/use-controller.tsx"
import { memo } from "react"

type CardProps = {
	id: UniqueIdentifier
	containerId: UniqueIdentifier
	isOverlay: boolean
}

const Card = (props: CardProps) => {
	const {
		id,
		isOverlay,
		containerId
	} = props

	const {
		sortable,
		cardInfo
	} = useController({
		cardId: id,
		containerId
	})

	if (!cardInfo) {
		return null
	}

	return (
		<div
			className="flex w-full min-h-44 rounded-xl border border-gray-400 p-4"
			ref={sortable.setNodeRef}
			data-card-id={id}
			style={{
				transition: sortable.transition,
				transform: sortable.transform,
				opacity: sortable.isDragging ? 0.5 : undefined,
				touchAction: "manipulation",
				cursor: isOverlay ? "grabbing" : "grab"
			}}
			{...sortable.listeners}
			{...sortable.attributes}
		>
			<div className="flex flex-col gap-4 w-full">
				<div className="w-full">
					<h1 className="text-2xl text-wrap">{cardInfo.title}</h1>
				</div>
				<div className="flex items-center gap-4">
					<ClientIcon />
					<span>Antonio Wellington da Silva</span>
				</div>
				<div className="flex gap-2">
					<Tag type="ERROR" name="Urgente" icon={<PriorityIcon className="w-3 h-3" />} />
					<Tag type="SUCCESS" name="250,00R$" icon={<ProposalCostIcon className="w-3 h-3" />} />
					<Tag type="INFO" name="Jun 10" icon={<ExpirationDateIcon className="w-3 h-3" />} />
				</div>
			</div>
			<div>
				<MoreOptionsMenuIcon style={{ fill: customStyles.colors.neutral[500] }} />
			</div>
		</div>
	)
}

export default memo(Card)
