import type { StagesFormattedForList } from "@/interfaces/propose-interface"
import proposeService from "@/services/propose-service"
import { create } from "zustand"

interface BoardStore {
	stages: StagesFormattedForList
	setStages: (stages: StagesFormattedForList) => void
	loadStages: () => Promise<void>
	isBoardLoading: boolean
}

const useBoardStore = create<BoardStore>((set) => ({
	stages: {} as StagesFormattedForList,
	isBoardLoading: false,
	setStages: (stages) => set(() => ({ stages })),
	loadStages: async () => {
		set({ isBoardLoading: true })

		try {
			const stages = await proposeService.getProposes()

			set({ stages })
		} catch (error) {
			console.log(error)
		}

		set({ isBoardLoading: false })
	}
}))

export default useBoardStore
