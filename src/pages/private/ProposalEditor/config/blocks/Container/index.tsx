import type { ComponentConfig } from "@measured/puck"
import { DropZone } from "@measured/puck"

export type ContainerProps = {
	backgroundColor?: string
	padding?: "small" | "medium" | "large"
	maxWidth?: "full" | "container" | "narrow"
	textAlign?: "left" | "center" | "right"
}

export const Container: ComponentConfig<ContainerProps> = {
	fields: {
		backgroundColor: {
			type: "select",
			label: "Cor de Fundo",
			options: [
				{ label: "Transparente", value: "transparent" },
				{ label: "Branco", value: "#ffffff" },
				{ label: "Cinza Claro", value: "#f8f9fa" },
				{ label: "Cinza", value: "#e9ecef" },
				{ label: "Azul Claro", value: "#e7f3ff" }
			]
		},
		padding: {
			type: "radio",
			label: "Espaçamento Interno",
			options: [
				{ label: "Pequeno", value: "small" },
				{ label: "Médio", value: "medium" },
				{ label: "Grande", value: "large" }
			]
		},
		maxWidth: {
			type: "radio",
			label: "Largura Máxima",
			options: [
				{ label: "Total", value: "full" },
				{ label: "Container", value: "container" },
				{ label: "Estreita", value: "narrow" }
			]
		},
		textAlign: {
			type: "radio",
			label: "Alinhamento do Texto",
			options: [
				{ label: "Esquerda", value: "left" },
				{ label: "Centro", value: "center" },
				{ label: "Direita", value: "right" }
			]
		}
	},
	defaultProps: {
		backgroundColor: "transparent",
		padding: "medium",
		maxWidth: "container",
		textAlign: "left"
	},
	render: ({ backgroundColor, padding, maxWidth, textAlign, puck, children }) => {
		const paddingMap = {
			small: "1rem",
			medium: "2rem", 
			large: "3rem"
		}

		const maxWidthMap = {
			full: "100%",
			container: "1200px",
			narrow: "800px"
		}

		return (
			<div 
				ref={puck.dragRef}
				style={{
					backgroundColor,
					padding: paddingMap[padding],
					textAlign,
					width: "100%"
				}}
			>
				<div style={{
					maxWidth: maxWidthMap[maxWidth],
					margin: "0 auto"
				}}>
					<DropZone zone="container-content" />
				</div>
			</div>
		)
	}
}