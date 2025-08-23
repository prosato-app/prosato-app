import { useCallback, useEffect, useState } from "react"
import { arrayMove } from "@dnd-kit/sortable"
import { createPortal } from "react-dom"
import {
	TouchSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
	type DragOverEvent,
	type DragStartEvent,
	type UniqueIdentifier,
	DragOverlay,
	defaultDropAnimationSideEffects,
	closestCenter
} from "@dnd-kit/core"
import type { StagesFormattedForList } from "@/interfaces/propose-interface"
import type { StageType } from "@/interfaces/stage-interface"
import SmartPointerSensorUtil from "@/utils/smart-pointer-sensor-util"
import Card from "@/pages/private/Proposals/board/stage/card"
import { mountStagesWithCardIds } from "@/utils/mount-stage-with-card-ids"
import { findContainer } from "@/utils/find-container"

export type Items = Record<UniqueIdentifier, UniqueIdentifier[]>

const useDragAndDrop = (props: {
	stages: StagesFormattedForList
	onCardMove?: (cardId: string, fromStage: StageType, toStage: StageType, newIndex: number) => void
}) => {
	const {
		stages,
		onCardMove
	} = props

	const [activeCardId, setActiveCardId] = useState<UniqueIdentifier | null>(null)
	const [originalContainer, setOriginalContainer] = useState<UniqueIdentifier | null>(null)
	const [stagesWithCardIds, setStagesWithCardIds] = useState<Items>({})
	const [stageIds, setStageIds] = useState<UniqueIdentifier[]>([])

	const sensors = useSensors(
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250,
				tolerance: 5
			}
		}),
		useSensor(SmartPointerSensorUtil, {
			activationConstraint: {
				distance: 10
			}
		})
	)

	const onDragStart = useCallback((event: DragStartEvent) => {
		setActiveCardId(event.active.id)
		// Store the original container before any moves happen
		const activeContainer = findContainer(stagesWithCardIds, event.active.id)
		setOriginalContainer(activeContainer || null)
	}, [stagesWithCardIds])

	const onDragOver = useCallback((event: DragOverEvent) => {
		const { over, active } = event
		const overId = over?.id

		if (!overId || active.id in stagesWithCardIds) {
			return
		}

		const overContainer = findContainer(stagesWithCardIds, overId)
		const activeContainer = findContainer(stagesWithCardIds, active.id)

		if (!overContainer || !activeContainer || activeContainer === overContainer) {
			return
		}

		// Move card between containers
		setStagesWithCardIds((prevItems) => {
			const activeItems = prevItems[activeContainer]
			const overItems = prevItems[overContainer]

			let newIndex: number
			if (overId in prevItems) {
				// Dropped on empty container
				newIndex = overItems.length
			} else {
				// Dropped on a card
				const overIndex = overItems.indexOf(overId)
				const isBelowOverItem = over && active.rect.current.translated &&
					active.rect.current.translated.top > over.rect.top + over.rect.height
				newIndex = overIndex + (isBelowOverItem ? 1 : 0)
			}

			return {
				...prevItems,
				[activeContainer]: activeItems.filter(item => item !== active.id),
				[overContainer]: [
					...overItems.slice(0, newIndex),
					active.id,
					...overItems.slice(newIndex)
				]
			}
		})
	}, [stagesWithCardIds])

	const onDragEnd = useCallback((event: DragEndEvent) => {
		const { active, over } = event

		if (!over || !originalContainer) {
			setActiveCardId(null)
			setOriginalContainer(null)
			return
		}

		const overContainer = findContainer(stagesWithCardIds, over.id)

		if (!overContainer) {
			setActiveCardId(null)
			setOriginalContainer(null)
			return
		}

		// Always notify about the final position using the original container as fromStage
		if (onCardMove) {
			let newIndex: number

			if (originalContainer === overContainer) {
				// Moving within same container
				newIndex = stagesWithCardIds[overContainer].indexOf(over.id)
			} else {
				// Moving between containers
				newIndex = over.id in stagesWithCardIds
					? stagesWithCardIds[overContainer].length
					: stagesWithCardIds[overContainer].indexOf(over.id)
			}

			onCardMove(
				String(active.id),
				originalContainer as StageType,
				overContainer as StageType,
				newIndex
			)
		}

		// Handle local state update for reordering within the same container
		if (originalContainer === overContainer) {
			const activeIndex = stagesWithCardIds[originalContainer].indexOf(active.id)
			const overIndex = stagesWithCardIds[overContainer].indexOf(over.id)

			if (activeIndex !== overIndex) {
				setStagesWithCardIds((prevItems) => ({
					...prevItems,
					[overContainer]: arrayMove(
						prevItems[overContainer],
						activeIndex,
						overIndex
					)
				}))
			}
		}

		setActiveCardId(null)
		setOriginalContainer(null)
	}, [stagesWithCardIds, onCardMove, originalContainer])

	const onDragCancel = useCallback(() => {
		// Reset to original state from stages prop
		const { items } = mountStagesWithCardIds(stages)
		setStagesWithCardIds(items)
		setActiveCardId(null)
		setOriginalContainer(null)
	}, [stages])

	const handleCreateDraggableOverlay = useCallback(() => {
		if (!activeCardId) {
			return null
		}

		const containerID = findContainer(stagesWithCardIds, activeCardId)
		if (!containerID) {
			return null
		}

		return createPortal(
			<DragOverlay
				adjustScale={false}
				dropAnimation={{
					sideEffects: defaultDropAnimationSideEffects({
						styles: {
							active: {
								opacity: "0.5"
							}
						}
					})
				}}
			>
				<Card
					id={activeCardId}
					containerId={containerID}
					isOverlay={true}
				/>
			</DragOverlay>,
			document.body
		)
	}, [activeCardId, stagesWithCardIds])

	const collisionDetectionStrategy = closestCenter

	useEffect(() => {
		const { items, stageIds } = mountStagesWithCardIds(stages)
		setStageIds(stageIds)
		setStagesWithCardIds(items)
	}, [stages])

	return {
		onDragCancel,
		onDragEnd,
		onDragOver,
		onDragStart,
		sensors,
		collisionDetectionStrategy,
		stageIds,
		stagesWithCardIds,
		activeCardId,
		handleCreateDraggableOverlay
	}
}

export default useDragAndDrop
