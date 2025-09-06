import type { ComponentConfig } from "@measured/puck"

export type DividerProps = {
	type?: "line" | "space" | "decorative"
	color?: string
	thickness?: "thin" | "medium" | "thick"
	style?: "solid" | "dashed" | "dotted"
	spacing?: "small" | "medium" | "large"
}

export const Divider: ComponentConfig<DividerProps> = {
	fields: {
		type: {
			type: "radio",
			label: "Tipo de Divisor",
			options: [
				{ label: "Linha", value: "line" },
				{ label: "Espaço", value: "space" },
				{ label: "Decorativo", value: "decorative" }
			]
		},
		color: {
			type: "select",
			label: "Cor da Linha",
			options: [
				{ label: "Cinza Claro", value: "#e9ecef" },
				{ label: "Cinza", value: "#6c757d" },
				{ label: "Azul", value: "#007bff" },
				{ label: "Verde", value: "#28a745" }
			]
		},
		thickness: {
			type: "radio",
			label: "Espessura",
			options: [
				{ label: "Fina", value: "thin" },
				{ label: "Média", value: "medium" },
				{ label: "Grossa", value: "thick" }
			]
		},
		style: {
			type: "radio",
			label: "Estilo da Linha",
			options: [
				{ label: "Sólida", value: "solid" },
				{ label: "Tracejada", value: "dashed" },
				{ label: "Pontilhada", value: "dotted" }
			]
		},
		spacing: {
			type: "radio",
			label: "Espaçamento",
			options: [
				{ label: "Pequeno", value: "small" },
				{ label: "Médio", value: "medium" },
				{ label: "Grande", value: "large" }
			]
		}
	},
	defaultProps: {
		type: "line",
		color: "#e9ecef",
		thickness: "thin",
		style: "solid",
		spacing: "medium"
	},
	render: ({ type, color, thickness, style, spacing, puck }) => {
		const spacingMap = {
			small: "1rem",
			medium: "2rem",
			large: "3rem"
		}

		const thicknessMap = {
			thin: "1px",
			medium: "2px",
			thick: "4px"
		}

		if (type === "space") {
			return (
				<div 
					ref={puck.dragRef}
					style={{
						height: spacingMap[spacing],
						width: "100%"
					}}
				/>
			)
		}

		if (type === "decorative") {
			return (
				<div 
					ref={puck.dragRef}
					style={{
						padding: spacingMap[spacing],
						textAlign: "center"
					}}
				>
					<div style={{
						display: "inline-flex",
						alignItems: "center",
						gap: "1rem"
					}}>
						<div style={{
							width: "50px",
							height: thicknessMap[thickness],
							backgroundColor: color,
							borderStyle: style
						}} />
						<div style={{
							width: "8px",
							height: "8px",
							backgroundColor: color,
							borderRadius: "50%"
						}} />
						<div style={{
							width: "50px",
							height: thicknessMap[thickness],
							backgroundColor: color,
							borderStyle: style
						}} />
					</div>
				</div>
			)
		}

		return (
			<div 
				ref={puck.dragRef}
				style={{
					padding: `${spacingMap[spacing]} 0`
				}}
			>
				<hr style={{
					border: "none",
					borderTop: `${thicknessMap[thickness]} ${style} ${color}`,
					margin: "0"
				}} />
			</div>
		)
	}
}