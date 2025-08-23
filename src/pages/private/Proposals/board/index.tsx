import Stage from "@/pages/private/Proposals/board/stage"
import useController from "@/pages/private/Proposals/board/use-controller"
import { DndContext, MeasuringStrategy } from "@dnd-kit/core"
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable"

const Board = () => {
	const {
		onDragCancel,
		onDragEnd,
		onDragOver,
		onDragStart,
		sensors,
		stagesWithCardIds,
		stageIds,
		handleCreateDraggableOverlay,
		collisionDetectionStrategy
	} = useController()

	return (
		<DndContext
			onDragEnd={onDragEnd}
			onDragCancel={onDragCancel}
			onDragOver={onDragOver}
			onDragStart={onDragStart}
			sensors={sensors}
			measuring={{
				droppable: {
					strategy: MeasuringStrategy.Always
				}
			}}
			collisionDetection={collisionDetectionStrategy}
		>
			<div className="flex w-full h-full flex-nowrap">
				<div className="flex overflow-x-auto w-full h-full flex-nowrap overflow-y-hidden select-none whitespace-nowrap gap-3">
					<SortableContext
						items={stageIds}
						strategy={horizontalListSortingStrategy}
					>
						{stageIds?.map(stageId => (
							<Stage
								key={stageId}
								containerId={stageId}
								items={stagesWithCardIds}
							/>
						))}
					</SortableContext>
				</div>
				{handleCreateDraggableOverlay()}
			</div>
		</DndContext>
	)
}

export default Board
