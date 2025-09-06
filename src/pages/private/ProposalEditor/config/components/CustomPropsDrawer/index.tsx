import type { ComponentKey } from "@/pages/private/ProposalEditor/config/types"
import { createUsePuck } from "@measured/puck"

export function CustomPropsDrawer() {
	const usePuck = createUsePuck()

	const selectedItem = usePuck((s) => s.selectedItem)
	const data = usePuck((s) => s.appState.data)
	const dispatch = usePuck((s) => s.dispatch)
	const config = usePuck((s) => s.config)

	const fields = selectedItem
		? config.components[selectedItem?.type as ComponentKey]?.fields
		: null

	const onPropertyChange = (property: string, value: unknown) => {
		if (!selectedItem) return

		const newData = {
			...data,
			content: data.content.map((item) =>
				item.props?.id === selectedItem.props.id
					? {
						...item,
						props: { ...item.props, [property]: value },
					}
					: item
			),
		}

		dispatch({
			type: "setData",
			data: newData,
		})
	}

	const deleteComponent = () => {
		if (!selectedItem) return

		const newData = {
			...data,
			content: data.content.filter((item) => item.props?.id !== selectedItem.props.id),
		}

		dispatch({
			type: "setData",
			data: newData,
		})
	}

	if (!selectedItem) {
		return (
			<div className="w-full bg-white border-l border-gray-200 shadow-sm">
				<div className="p-4 border-b border-gray-100">
					<h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
						Propriedades
					</h2>
				</div>
				<div className="p-6 text-sm text-gray-500">
					Selecione um componente para editar suas propriedades
				</div>
			</div>
		)
	}
	const handleChange = (property: string, value: unknown) =>
		onPropertyChange(property, value)

	const renderField = (
		key: string,
		field: Record<string, unknown>,
		value: unknown
	) => {
		const fieldType = field.type as string
		const label = (field.label as string) || "Campo"
		const placeholder = field.placeholder as string
		const options =
			(field.options as Array<{ label: string; value: any }>) || []

		switch (fieldType) {
			case "text":
				return (
					<div key={key} className="space-y-2">
						<label className="text-sm font-medium text-gray-700">{label}</label>
						<input
							value={(value as string) || ""}
							onChange={(e) => handleChange(key, e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
							placeholder={placeholder || `Digite ${label.toLowerCase()}`}
						/>
					</div>
				)
			case "textarea":
				return (
					<div key={key} className="space-y-2">
						<label className="text-sm font-medium text-gray-700">{label}</label>
						<textarea
							value={(value as string) || ""}
							onChange={(e) => handleChange(key, e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
							rows={3}
							placeholder={placeholder || `Digite ${label.toLowerCase()}`}
						/>
					</div>
				)
			case "number":
				return (
					<div key={key} className="space-y-2">
						<label className="text-sm font-medium text-gray-700">{label}</label>
						<input
							type="number"
							value={value ?? 0}
							onChange={(e) =>
								handleChange(key, parseFloat(e.target.value) || 0)
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
							placeholder={placeholder || "0"}
						/>
					</div>
				)
			case "select":
				return (
					<div key={key} className="space-y-2">
						<label className="text-sm font-medium text-gray-700">{label}</label>
						<select
							value={value?.toString() || options[0]?.value?.toString() || ""}
							onChange={(e) => handleChange(key, e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
						>
							{options.map((opt) => (
								<option key={opt.value.toString()} value={opt.value.toString()}>
									{opt.label}
								</option>
							))}
						</select>
					</div>
				)
			default:
				return null
		}
	}

	return (
		<div className="w-full bg-white border-l border-gray-200 shadow-sm overflow-y-auto">
			<div className="p-4 border-b border-gray-100">
				<h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
					Propriedades
				</h2>
			</div>

			<div className="p-6">
				<div className="space-y-6">
					<div className="pb-4 border-b border-gray-100">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								<h3 className="text-sm font-semibold text-gray-900">
									{selectedItem.type}
								</h3>
							</div>
							<button
								onClick={deleteComponent}
								className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
							>
								🗑️
							</button>
						</div>
						<p className="text-xs text-gray-500">
							Configure as propriedades do componente selecionado
						</p>
					</div>

					<div className="space-y-4">
						{fields &&
							Object.entries(fields).map(([key, field]) => {
								const currentValue = selectedItem.props?.[key]
								return renderField(key, field, currentValue)
							})}
					</div>
				</div>
			</div>
		</div>
	)
}
