import Tag from "@/components/Tag"
import customStyles from "@/styles/customStyles"
import {
	Calendar as ExpirationDateIcon,
	User as ClientIcon,
	DollarSign as ProposalCostIcon,
	EllipsisVertical as MoreOptionsMenuIcon,
	Flag as PriorityIcon,
	Edit as EditIcon
} from "lucide-react"
import type { UniqueIdentifier } from "@dnd-kit/core"
import useController from "@/pages/private/Proposals/board/stage/card/use-controller"
import { memo } from "react"
import { Link } from "react-router-dom"
import IconButton from "@/components/IconButton"
import Popover from "@/components/Popover"

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
		cardInfo,
		handleRedirectToEditProposal,
		handleDeleteProposal
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
				<div className="flex gap-2 mt-2">
					<Link
						to={`/proposal-editor/${id}`}
						className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
						onClick={(e) => e.stopPropagation()}
					>
						<EditIcon className="w-3 h-3" />
						Editar Proposta
					</Link>
				</div>
			</div>
			<div>
				<Popover
					menuOptions={[
						{
							name: "Editar Proposta",
							onClick: handleRedirectToEditProposal
						},
						{
							name: "Excluir Proposta",
							onClick: handleDeleteProposal
						}
					]}
					position="left"
					trigger="click"
				>
					<IconButton>
						<MoreOptionsMenuIcon style={{ fill: customStyles.colors.neutral[500] }} />
					</IconButton>
				</Popover>
			</div>
		</div>
	)
}

export default memo(Card)
