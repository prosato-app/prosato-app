import type { ComponentConfig } from "@measured/puck"

export type PackagesPricesProps = {
	title?: string
	description?: string
	packages?: Array<{
		name: string
		price: string
		period?: string
		description: string
		features: string[]
		highlighted?: boolean
	}>
	backgroundColor?: string
	textColor?: string
}

export const PackagesPrices: ComponentConfig<PackagesPricesProps> = {
	fields: {
		title: {
			type: "text",
			label: "Título"
		},
		description: {
			type: "textarea",
			label: "Descrição"
		},
		packages: {
			type: "array",
			label: "Pacotes",
			arrayFields: {
				name: {
					type: "text",
					label: "Nome do Pacote"
				},
				price: {
					type: "text",
					label: "Preço"
				},
				period: {
					type: "text",
					label: "Período"
				},
				description: {
					type: "textarea",
					label: "Descrição"
				},
				features: {
					type: "array",
					label: "Recursos Inclusos",
					arrayFields: {
						feature: {
							type: "text",
							label: "Recurso"
						}
					}
				},
				highlighted: {
					type: "radio",
					label: "Destacar Pacote",
					options: [
						{ label: "Sim", value: true },
						{ label: "Não", value: false }
					]
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
		title: "Pacotes e Investimento",
		description: "Escolha o pacote que melhor se adequa às suas necessidades e orçamento.",
		packages: [
			{
				name: "Básico",
				price: "R$ 5.000",
				period: "único",
				description: "Solução essencial para começar",
				features: ["Consultoria inicial", "Implementação básica", "Suporte por 30 dias"],
				highlighted: false
			},
			{
				name: "Profissional",
				price: "R$ 12.000",
				period: "único",
				description: "Solução completa para crescimento",
				features: ["Consultoria completa", "Implementação avançada", "Treinamento da equipe", "Suporte por 90 dias"],
				highlighted: true
			},
			{
				name: "Enterprise",
				price: "R$ 25.000",
				period: "único",
				description: "Solução premium personalizada",
				features: ["Consultoria estratégica", "Implementação customizada", "Treinamento avançado", "Suporte por 180 dias", "Revisões trimestrais"],
				highlighted: false
			}
		],
		backgroundColor: "#f8f9fa",
		textColor: "#000000"
	},
	render: ({ title, description, packages, backgroundColor, textColor, puck }) => {
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
								color: "#6c757d"
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
						{packages?.map((pkg, index) => (
							<div key={index} style={{
								padding: "2rem",
								backgroundColor: pkg.highlighted ? "#007bff" : "#ffffff",
								color: pkg.highlighted ? "#ffffff" : textColor,
								borderRadius: "12px",
								boxShadow: pkg.highlighted ? "0 8px 25px rgba(0,123,255,0.3)" : "0 4px 6px rgba(0,0,0,0.1)",
								border: pkg.highlighted ? "none" : "2px solid #e9ecef",
								transform: pkg.highlighted ? "scale(1.05)" : "scale(1)",
								position: "relative",
								textAlign: "center"
							}}>
								{pkg.highlighted && (
									<div style={{
										position: "absolute",
										top: "-10px",
										left: "50%",
										transform: "translateX(-50%)",
										backgroundColor: "#28a745",
										color: "#ffffff",
										padding: "0.5rem 1rem",
										borderRadius: "20px",
										fontSize: "0.875rem",
										fontWeight: "bold"
									}}>
										RECOMENDADO
									</div>
								)}

								<h3 style={{
									fontSize: "1.5rem",
									fontWeight: "bold",
									margin: "0 0 0.5rem 0"
								}}>
									{pkg.name}
								</h3>

								<div style={{ marginBottom: "1rem" }}>
									<div style={{
										fontSize: "2.5rem",
										fontWeight: "bold",
										margin: "0"
									}}>
										{pkg.price}
									</div>
									{pkg.period && (
										<div style={{
											fontSize: "0.875rem",
											opacity: 0.8,
											margin: "0"
										}}>
											{pkg.period}
										</div>
									)}
								</div>

								<p style={{
									margin: "0 0 2rem 0",
									opacity: 0.9
								}}>
									{pkg.description}
								</p>

								<ul style={{
									listStyle: "none",
									padding: "0",
									margin: "0",
									textAlign: "left"
								}}>
									{pkg.features?.map((feature, featureIndex) => (
										<li key={featureIndex} style={{
											padding: "0.5rem 0",
											borderBottom: featureIndex < pkg.features.length - 1 ? `1px solid ${pkg.highlighted ? 'rgba(255,255,255,0.2)' : '#e9ecef'}` : "none",
											display: "flex",
											alignItems: "center",
											gap: "0.5rem"
										}}>
											<span style={{
												color: pkg.highlighted ? "#ffffff" : "#28a745",
												fontWeight: "bold"
											}}>
												✓
											</span>
											{feature}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</section>
		)
	}
}