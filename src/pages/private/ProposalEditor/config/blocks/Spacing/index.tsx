import type { ComponentConfig } from "@measured/puck"

export type SpacingProps = {
	height?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
	backgroundColor?: string
}

export const Spacing: ComponentConfig<SpacingProps> = {
	fields: {
		height: {
			type: "radio",
			label: "Altura do Espaçamento",
			options: [
				{ label: "Extra Pequeno", value: "xs" },
				{ label: "Pequeno", value: "sm" },
				{ label: "Médio", value: "md" },
				{ label: "Grande", value: "lg" },
				{ label: "Extra Grande", value: "xl" },
				{ label: "2X Grande", value: "2xl" }
			]
		},
		backgroundColor: {
			type: "select",
			label: "Cor de Fundo",
			options: [
				{ label: "Transparente", value: "transparent" },
				{ label: "Branco", value: "#ffffff" },
				{ label: "Cinza Claro", value: "#f8f9fa" },
				{ label: "Cinza", value: "#e9ecef" }
			]
		}
	},
	defaultProps: {
		height: "md",
		backgroundColor: "transparent"
	},
	render: ({ height, backgroundColor, puck }) => {
		const heightMap = {
			xs: "0.5rem",
			sm: "1rem",
			md: "2rem",
			lg: "3rem",
			xl: "4rem",
			"2xl": "6rem"
		}

		return (
			<div 
				ref={puck.dragRef}
				style={{
					height: heightMap[height],
					width: "100%",
					backgroundColor,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					border: "1px dashed #dee2e6",
					opacity: 0.5,
					fontSize: "0.875rem",
					color: "#6c757d"
				}}
			>
				Espaçamento ({height})
			</div>
		)
	}
}