import React from "react"
import { usePuck } from "@measured/puck"
import { Layers, ChevronRight } from "lucide-react"

const StructureFooter = () => {
	const { appState } = usePuck()
	const { data } = appState

	// Build a tree structure from the data
	const buildStructureTree = (data: any) => {
		const { content, zones } = data
		const tree: any[] = []

		// Process root content
		content.forEach((item: any, index: number) => {
			const node = {
				id: item.props.id,
				type: item.type,
				level: 0,
				children: []
			}

			// Check if this component has zones
			if (zones && zones[item.props.id]) {
				Object.keys(zones[item.props.id]).forEach(zoneKey => {
					const zoneItems = zones[item.props.id][zoneKey]
					zoneItems.forEach((zoneItem: any) => {
						node.children.push({
							id: zoneItem.props.id,
							type: zoneItem.type,
							level: 1,
							zone: zoneKey,
							children: []
						})
					})
				})
			}

			tree.push(node)
		})

		return tree
	}

	const structureTree = buildStructureTree(data)

	const getComponentLabel = (type: string) => {
		const labelMap: Record<string, string> = {
			Text: "Texto",
			Grid: "Grade",
			Header: "Cabeçalho",
			HeroSection: "Seção Hero",
			CompanyPresentation: "Apresentação da Empresa",
			Container: "Container",
			Divider: "Divisor",
			Spacing: "Espaçamento",
			ServiceDescription: "Descrição de Serviços",
			PackagesPrices: "Pacotes & Preços",
			CallToAction: "Call-to-Action",
			Testimonials: "Depoimentos"
		}
		return labelMap[type] || type
	}

	const renderTreeNode = (node: any, index: number) => {
		return (
			<div key={node.id} className="flex items-center text-xs">
				<div 
					className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded"
					style={{ marginLeft: `${node.level * 16}px` }}
				>
					{node.level > 0 && <ChevronRight size={12} />}
					<Layers size={12} />
					<span className="font-medium">{getComponentLabel(node.type)}</span>
					{node.zone && (
						<span className="text-blue-500 text-xs">({node.zone})</span>
					)}
				</div>
			</div>
		)
	}

	if (!data || !data.content || data.content.length === 0) {
		return (
			<div className="border-t border-gray-200 p-3 bg-gray-50">
				<div className="flex items-center gap-2 text-gray-500 text-sm">
					<Layers size={16} />
					<span>Estrutura vazia - Adicione componentes para visualizar</span>
				</div>
			</div>
		)
	}

	return (
		<div className="border-t border-gray-200 p-3 bg-gray-50 max-h-48 overflow-y-auto">
			<div className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
				<Layers size={16} />
				<span>Estrutura da Página ({data.content.length} componentes)</span>
			</div>
			<div className="space-y-1">
				{structureTree.map((node, index) => (
					<div key={node.id}>
						{renderTreeNode(node, index)}
						{node.children.map((child: any, childIndex: number) => 
							renderTreeNode(child, childIndex)
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default StructureFooter