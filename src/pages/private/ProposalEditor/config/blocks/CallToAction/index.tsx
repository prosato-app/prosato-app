import type { ComponentConfig } from "@measured/puck"

export type CallToActionProps = {
	title?: string
	description?: string
	buttonText?: string
	buttonUrl?: string
	secondaryButtonText?: string
	secondaryButtonUrl?: string
	backgroundColor?: string
	textColor?: string
	buttonColor?: string
}

export const CallToAction: ComponentConfig<CallToActionProps> = {
	fields: {
		title: {
			type: "text",
			label: "Título"
		},
		description: {
			type: "textarea",
			label: "Descrição"
		},
		buttonText: {
			type: "text",
			label: "Texto do Botão Principal"
		},
		buttonUrl: {
			type: "text",
			label: "URL do Botão Principal"
		},
		secondaryButtonText: {
			type: "text",
			label: "Texto do Botão Secundário"
		},
		secondaryButtonUrl: {
			type: "text",
			label: "URL do Botão Secundário"
		},
		backgroundColor: {
			type: "select",
			label: "Cor de Fundo",
			options: [
				{ label: "Azul", value: "#007bff" },
				{ label: "Azul Escuro", value: "#003d7a" },
				{ label: "Verde", value: "#28a745" },
				{ label: "Roxo", value: "#6f42c1" }
			]
		},
		textColor: {
			type: "select",
			label: "Cor do Texto",
			options: [
				{ label: "Branco", value: "#ffffff" },
				{ label: "Cinza Claro", value: "#f8f9fa" }
			]
		},
		buttonColor: {
			type: "select",
			label: "Cor do Botão",
			options: [
				{ label: "Branco", value: "#ffffff" },
				{ label: "Verde", value: "#28a745" },
				{ label: "Amarelo", value: "#ffc107" }
			]
		}
	},
	defaultProps: {
		title: "Pronto para Começar?",
		description: "Entre em contato conosco agora mesmo e vamos transformar sua visão em realidade.",
		buttonText: "Aceitar Proposta",
		buttonUrl: "#",
		secondaryButtonText: "Falar com Consultor",
		secondaryButtonUrl: "#",
		backgroundColor: "#007bff",
		textColor: "#ffffff",
		buttonColor: "#ffffff"
	},
	render: ({ title, description, buttonText, buttonUrl, secondaryButtonText, secondaryButtonUrl, backgroundColor, textColor, buttonColor, puck }) => {
		return (
			<section 
				ref={puck.dragRef}
				style={{
					backgroundColor,
					color: textColor,
					padding: "4rem 2rem",
					textAlign: "center"
				}}
			>
				<div style={{ maxWidth: "800px", margin: "0 auto" }}>
					<h2 style={{
						fontSize: "2.5rem",
						fontWeight: "bold",
						margin: "0 0 1rem 0"
					}}>
						{title}
					</h2>
					
					{description && (
						<p style={{
							fontSize: "1.25rem",
							lineHeight: 1.6,
							margin: "0 0 2rem 0",
							opacity: 0.9
						}}>
							{description}
						</p>
					)}

					<div style={{
						display: "flex",
						flexDirection: "row",
						gap: "1rem",
						justifyContent: "center",
						flexWrap: "wrap"
					}}>
						{buttonText && (
							<a
								href={buttonUrl}
								style={{
									display: "inline-block",
									padding: "1rem 2rem",
									backgroundColor: buttonColor,
									color: backgroundColor,
									textDecoration: "none",
									borderRadius: "8px",
									fontSize: "1.125rem",
									fontWeight: "600",
									border: "none",
									cursor: "pointer",
									boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
									transition: "all 0.2s"
								}}
								onMouseOver={(e) => {
									e.currentTarget.style.transform = "translateY(-2px)"
									e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)"
								}}
								onMouseOut={(e) => {
									e.currentTarget.style.transform = "translateY(0)"
									e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"
								}}
							>
								{buttonText}
							</a>
						)}

						{secondaryButtonText && (
							<a
								href={secondaryButtonUrl}
								style={{
									display: "inline-block",
									padding: "1rem 2rem",
									backgroundColor: "transparent",
									color: textColor,
									textDecoration: "none",
									borderRadius: "8px",
									fontSize: "1.125rem",
									fontWeight: "600",
									border: `2px solid ${textColor}`,
									cursor: "pointer",
									transition: "all 0.2s"
								}}
								onMouseOver={(e) => {
									e.currentTarget.style.backgroundColor = textColor
									e.currentTarget.style.color = backgroundColor
								}}
								onMouseOut={(e) => {
									e.currentTarget.style.backgroundColor = "transparent"
									e.currentTarget.style.color = textColor
								}}
							>
								{secondaryButtonText}
							</a>
						)}
					</div>
				</div>
			</section>
		)
	}
}