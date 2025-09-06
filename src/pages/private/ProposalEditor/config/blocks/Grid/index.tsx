import type { ComponentConfig } from "@measured/puck"
import { DropZone } from "@measured/puck"

export type GridProps = {
	columns: number
}

export const Grid: ComponentConfig<GridProps> = {
	fields: {
		columns: {
			type: "number",
			label: "Número de Colunas"
		}
	},
	defaultProps: {
		columns: 2
	},
	render: ({ columns }) => {
		return (
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${columns}, 1fr)`,
					gap: "16px",
					minHeight: 200,
					border: "1px dashed #cbd5e1",
					borderRadius: "8px",
					padding: 16,
					backgroundColor: "#f8fafc"
				}}
			>
				{Array.from({ length: columns }).map((_, index) => (
					<DropZone zone={`grid-${index}`} allow={["Text", "Section"]} key={`zone-${index}`} />
				))}
			</div>
		)
	}
}
