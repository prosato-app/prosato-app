import type { ComponentConfig } from "@measured/puck"
import { DropZone } from "@measured/puck"

export type ServiceDescriptionProps = {
	title?: string
	description?: string
	services?: Array<{
		name: string
		description: string
		icon?: string
	}>
	backgroundColor?: string
	textColor?: string
}

export const ServiceDescription: ComponentConfig<ServiceDescriptionProps> = {
	fields: {
		title: {
			type: "text",
			label: "Título"
		},
		description: {
			type: "textarea",
			label: "Descrição Geral"
		},
		services: {
			type: "array",
			label: "Serviços",
			arrayFields: {
				name: {
					type: "text",
					label: "Nome do Serviço"
				},
				description: {
					type: "textarea",
					label: "Descrição"
				},
				icon: {
					type: "text",
					label: "Ícone (URL ou emoji)"
				}
			}
		},
		backgroundColor: {
			type: "select",
			label: "Cor de Fundo",
			options: [
				{ label: "Branco", value: "#ffffff" },
				{ label: "Cinza Claro", value: "#f8f9fa" },
				{ label: "Azul Claro", value: "#e7f3ff" }
			]
		},
		textColor: {
			type: "select",
			label: "Cor do Texto",
			options: [
				{ label: "Preto", value: "#000000" },
				{ label: "Cinza Escuro", value: "#495057" }
			]
		}
	},
	defaultProps: {
		title: "Nossos Serviços",
		description: "Oferecemos soluções completas e personalizadas para atender às suas necessidades específicas.",
		services: [
			{
				name: "Consultoria Estratégica",
				description: "Análise e planejamento estratégico para otimizar seus processos e resultados.",
				icon: "💡"
			},
			{
				name: "Implementação",
				description: "Execução técnica completa da solução proposta com acompanhamento especializado.",
				icon: "⚙️"
			},
			{
				name: "Suporte Contínuo",
				description: "Acompanhamento e suporte técnico para garantir o sucesso a longo prazo.",
				icon: "🛠️"
			}
		],
		backgroundColor: "#ffffff",
		textColor: "#000000"
	},
	render: ({ title, description, services, backgroundColor, textColor, puck }) => {
		return (
			<section 
				ref={puck.dragRef}
				style={{
					backgroundColor,
					color: textColor,
					padding: "3rem 2rem"
				}}
			>
				<div style={{ maxWidth: "1200px", margin: "0 auto" }}>
					<div style={{ textAlign: "center", marginBottom: "3rem" }}>
						<h2 style={{
							fontSize: "2.5rem",
							fontWeight: "bold",
							margin: "0 0 1rem 0"
						}}>
							{title}
						</h2>
						{description && (
							<p style={{
								fontSize: "1.125rem",
								lineHeight: 1.6,
								margin: "0",
								color: "#6c757d",
								maxWidth: "600px",
								marginLeft: "auto",
								marginRight: "auto"
							}}>
								{description}
							</p>
						)}
					</div>

					<div style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
						gap: "2rem"
					}}>
						{services?.map((service, index) => (
							<div key={index} style={{
								padding: "2rem",
								backgroundColor: backgroundColor === "#ffffff" ? "#f8f9fa" : "#ffffff",
								borderRadius: "8px",
								boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
								textAlign: "center"
							}}>
								{service.icon && (
									<div style={{
										fontSize: "3rem",
										marginBottom: "1rem"
									}}>
										{service.icon}
									</div>
								)}
								<h3 style={{
									fontSize: "1.5rem",
									fontWeight: "600",
									margin: "0 0 1rem 0",
									color: "#007bff"
								}}>
									{service.name}
								</h3>
								<p style={{
									margin: "0",
									lineHeight: 1.5,
									color: "#6c757d"
								}}>
									{service.description}
								</p>
							</div>
						))}
					</div>

					{/* Additional content area */}
					<DropZone zone="services-additional" />
				</div>
			</section>
		)
	}
}