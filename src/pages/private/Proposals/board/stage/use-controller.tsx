import { type AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable"
import type { UniqueIdentifier } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

type UseControllerProps = {
	containerId: UniqueIdentifier
	containerItems: UniqueIdentifier[]
}

const useController = (props: UseControllerProps) => {
	const { containerId, containerItems } = props

	const animateLayoutChanges: AnimateLayoutChanges = (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true })
	
	const {
		attributes,
		isDragging,
		listeners,
		setNodeRef,
		transition,
		transform
	} = useSortable({
		id: containerId,
		data: {
			type: "container",
			children: containerItems
		},
		animateLayoutChanges
	})
	
	return {
		sortable: {
			attributes,
			isDragging,
			listeners,
			setNodeRef,
			transition,
			transform: CSS.Translate.toString(transform)
		}
	}
}

export default useController
