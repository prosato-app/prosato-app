import type { PropsWithChildren } from "react"
import { usePuck } from "@measured/puck"
import { useMemo } from "react"
import CustomComponentItem from "@/pages/private/ProposalEditor/config/components/CustomComponentItem"

type CustomComponentDrawerProps = PropsWithChildren

const CustomComponentDrawer = (_props: CustomComponentDrawerProps) => {
	const { config } = usePuck()

	const categorizedComponents = useMemo(() => {
		const categories = config.categories || {}
		const components = config.components || {}

		return Object.entries(categories).map(([categoryKey, category]) => ({
			key: categoryKey,
			title: category.title || categoryKey,
			components: category.components?.filter(componentName =>
				components[componentName]
			) || []
		}))
	}, [config])


	return (
		<div className="p-4 space-y-6">
			{categorizedComponents.map((category) => (
				<div key={category.key} className="space-y-3">
					<h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
						{category.title}
					</h3>
					<div className="grid grid-cols-2 gap-2">
						{category.components.map((componentName, index) => (
							<div key={`${category.key}-${index}`} className="w-full">
								<CustomComponentItem name={componentName as string} />
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default CustomComponentDrawer
