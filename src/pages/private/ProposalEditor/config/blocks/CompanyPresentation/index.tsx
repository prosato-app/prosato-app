import type { ComponentConfig } from "@measured/puck"
import { DropZone } from "@measured/puck"

export type CompanyPresentationProps = {
	title?: string
	description?: string
	mission?: string
	vision?: string
	values?: string
	experience?: string
	companyImage?: string
	backgroundColor?: string
	textColor?: string
}

export const CompanyPresentation: ComponentConfig<CompanyPresentationProps> = {
	fields: {
		title: {
			type: "text",
			label: "Título"
		},
		description: {
			type: "textarea",
			label: "Descrição da Empresa"
		},
		mission: {
			type: "textarea",
			label: "Missão"
		},
		vision: {
			type: "textarea",
			label: "Visão"
		},
		values: {
			type: "textarea",
			label: "Valores"
		},
		experience: {
			type: "text",
			label: "Anos de Experiência"
		},
		companyImage: {
			type: "text",
			label: "URL da Imagem da Empresa"
		},
		backgroundColor: {
			type: "select",
			label: "Cor de Fundo",
			options: [
				{ label: "Branco", value: "#ffffff" },
				{ label: "Cinza Claro", value: "#f8f9fa" },
				{ label: "Cinza", value: "#e9ecef" }
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
		title: "Sobre Nossa Empresa",
		description: "Somos uma empresa especializada em soluções inovadoras, com foco em resultados excepcionais para nossos clientes.",
		mission: "Transformar ideias em soluções práticas que geram valor real para nossos clientes.",
		vision: "Ser referência no mercado pela excelência em nossos serviços e relacionamento com clientes.",
		values: "Inovação, Qualidade, Transparência e Compromisso com Resultados.",
		experience: "10+",
		backgroundColor: "#ffffff",
		textColor: "#000000"
	},
	render: ({ title, description, mission, vision, values, experience, companyImage, backgroundColor, textColor, puck }) => {
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
					<h2 style={{
						fontSize: "2.5rem",
						fontWeight: "bold",
						margin: "0 0 2rem 0",
						textAlign: "center"
					}}>
						{title}
					</h2>
					
					<div style={{
						display: "grid",
						gridTemplateColumns: companyImage ? "1fr 300px" : "1fr",
						gap: "3rem",
						alignItems: "center"
					}}>
						<div>
							<p style={{
								fontSize: "1.125rem",
								lineHeight: 1.6,
								margin: "0 0 2rem 0"
							}}>
								{description}
							</p>

							<div style={{
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
								gap: "1.5rem",
								marginBottom: "2rem"
							}}>
								{mission && (
									<div>
										<h3 style={{
											fontSize: "1.25rem",
											fontWeight: "600",
											margin: "0 0 0.5rem 0",
											color: "#007bff"
										}}>
											Missão
										</h3>
										<p style={{ margin: "0", lineHeight: 1.5 }}>{mission}</p>
									</div>
								)}
								
								{vision && (
									<div>
										<h3 style={{
											fontSize: "1.25rem",
											fontWeight: "600",
											margin: "0 0 0.5rem 0",
											color: "#28a745"
										}}>
											Visão
										</h3>
										<p style={{ margin: "0", lineHeight: 1.5 }}>{vision}</p>
									</div>
								)}
								
								{values && (
									<div>
										<h3 style={{
											fontSize: "1.25rem",
											fontWeight: "600",
											margin: "0 0 0.5rem 0",
											color: "#dc3545"
										}}>
											Valores
										</h3>
										<p style={{ margin: "0", lineHeight: 1.5 }}>{values}</p>
									</div>
								)}
							</div>

							{experience && (
								<div style={{
									display: "inline-block",
									padding: "1rem 2rem",
									backgroundColor: "#007bff",
									color: "#ffffff",
									borderRadius: "8px",
									textAlign: "center"
								}}>
									<div style={{
										fontSize: "2rem",
										fontWeight: "bold",
										margin: "0"
									}}>
										{experience}
									</div>
									<div style={{
										fontSize: "0.875rem",
										margin: "0",
										opacity: 0.9
									}}>
										Anos de Experiência
									</div>
								</div>
							)}
						</div>

						{companyImage && (
							<div>
								<img 
									src={companyImage} 
									alt="Nossa empresa"
									style={{
										width: "100%",
										height: "300px",
										objectFit: "cover",
										borderRadius: "8px",
										boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
									}}
								/>
							</div>
						)}

						{/* Additional content area */}
						<DropZone zone="company-additional" />
					</div>
				</div>
			</section>
		)
	}
}