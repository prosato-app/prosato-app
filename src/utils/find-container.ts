import type { Items } from "@/pages/private/Proposals/board/useDragAndDrop"
import type { UniqueIdentifier } from "@dnd-kit/core"

export function findContainer(stagesWithCardIds: Items, id: UniqueIdentifier): UniqueIdentifier | undefined {
	if (id in stagesWithCardIds) return id

	return Object.keys(stagesWithCardIds).find(key => stagesWithCardIds[key].includes(id))
}
