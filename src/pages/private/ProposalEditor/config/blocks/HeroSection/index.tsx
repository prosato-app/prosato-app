import type { ComponentConfig } from "@measured/puck"
import { DropZone } from "@measured/puck"

export type HeroSectionProps = {
	title?: string
	subtitle?: string
	description?: string
	backgroundImage?: string
	backgroundColor?: string
	textColor?: string
	textAlign?: "left" | "center" | "right"
}

export const HeroSection: ComponentConfig<HeroSectionProps> = {
	fields: {
		title: {
			type: "text",
			label: "Título Principal"
		},
		subtitle: {
			type: "text", 
			label: "Subtítulo"
		},
		description: {
			type: "textarea",
			label: "Descrição"
		},
		backgroundImage: {
			type: "text",
			label: "URL da Imagem de Fundo"
		},
		backgroundColor: {
			type: "select",
			label: "Cor de Fundo",
			options: [
				{ label: "Branco", value: "#ffffff" },
				{ label: "Cinza Claro", value: "#f8f9fa" },
				{ label: "Azul", value: "#007bff" },
				{ label: "Azul Escuro", value: "#003d7a" },
				{ label: "Verde", value: "#28a745" }
			]
		},
		textColor: {
			type: "select",
			label: "Cor do Texto",
			options: [
				{ label: "Preto", value: "#000000" },
				{ label: "Cinza", value: "#6c757d" },
				{ label: "Branco", value: "#ffffff" }
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
		title: "Transforme Sua Visão em Realidade",
		subtitle: "Proposta Comercial Exclusiva",
		description: "Apresentamos uma solução personalizada que atende às suas necessidades específicas e impulsiona seus resultados.",
		backgroundColor: "#007bff",
		textColor: "#ffffff",
		textAlign: "center"
	},
	render: ({ title, subtitle, description, backgroundImage, backgroundColor, textColor, textAlign, puck }) => {
		return (
			<section 
				ref={puck.dragRef}
				style={{
					backgroundColor,
					backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
					backgroundSize: "cover",
					backgroundPosition: "center",
					color: textColor,
					textAlign,
					padding: "4rem 2rem",
					position: "relative",
					minHeight: "400px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<div style={{
					backgroundColor: backgroundImage ? "rgba(0,0,0,0.5)" : undefined,
					padding: backgroundImage ? "2rem" : undefined,
					borderRadius: backgroundImage ? "8px" : undefined,
					maxWidth: "800px"
				}}>
					{subtitle && (
						<p style={{
							fontSize: "1.125rem",
							margin: "0 0 1rem 0",
							opacity: 0.9
						}}>
							{subtitle}
						</p>
					)}
					<h1 style={{
						fontSize: "3rem",
						fontWeight: "bold",
						margin: "0 0 1.5rem 0",
						lineHeight: 1.2
					}}>
						{title}
					</h1>
					{description && (
						<p style={{
							fontSize: "1.25rem",
							margin: "0 0 1.5rem 0",
							lineHeight: 1.6,
							opacity: 0.95
						}}>
							{description}
						</p>
					)}
					<DropZone zone="hero-content" />
				</div>
			</section>
		)
	}
}