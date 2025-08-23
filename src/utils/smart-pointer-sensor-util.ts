import type { PointerEvent } from "react"
import { PointerSensor } from "@dnd-kit/core"

type SensorsEventsName = "onPointerDown"

/**
 * This class extends the PointerSensor to customize the `onPointerDown` event handling.
 * It checks if an element on the board is interactive to determine if a drag operation should be initiated.
 * This ensures that interactive elements (like buttons, inputs, and dialogs) are clickable and do not trigger drag events.
 */
class SmartPointerSensorUtil extends PointerSensor {
	static activators = [
		{
			eventName: "onPointerDown" as SensorsEventsName,
			handler: ({ nativeEvent: event }: PointerEvent) => {
				const isNotPrimaryPointer = !event.isPrimary
				const isNotLeftMouseButton = event.button !== 0
				const isBoardInteractiveElement = SmartPointerSensorUtil.isBoardInteractiveElement(event.target as Element)

				const isNotDraggableElement = isNotPrimaryPointer || isNotLeftMouseButton || isBoardInteractiveElement

				if (isNotDraggableElement) {
					return false
				}

				return true
			}
		}
	]

	static isBoardInteractiveElement(element: Element | null) {
		if (!element) {
			return true
		}

		const muiInteractiveElementsClasses = [
			"MuiDialog-container",
			"MuiBackdrop-root",
			"MuiButtonBase-root"
		]

		if (muiInteractiveElementsClasses.some(className => element.classList.contains(className))) {
			return true
		}

		const interactiveElements = [
			"button",
			"input",
			"textarea",
			"select",
			"option",
			"svg",
			"span",
			"li",
			"path"
		]

		const elementIsInteractive = element?.tagName && interactiveElements.includes(element.tagName.toLowerCase())

		if (elementIsInteractive) {
			return true
		}

		return false
	}
}

export default SmartPointerSensorUtil
