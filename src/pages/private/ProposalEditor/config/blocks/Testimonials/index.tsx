import type { ComponentConfig } from "@measured/puck"

export type TestimonialsProps = {
	title?: string
	description?: string
	testimonials?: Array<{
		name: string
		position: string
		company: string
		testimonial: string
		photo?: string
		rating?: number
	}>
	backgroundColor?: string
	textColor?: string
}

export const Testimonials: ComponentConfig<TestimonialsProps> = {
	fields: {
		title: {
			type: "text",
			label: "Título"
		},
		description: {
			type: "textarea",
			label: "Descrição"
		},
		testimonials: {
			type: "array",
			label: "Depoimentos",
			arrayFields: {
				name: {
					type: "text",
					label: "Nome"
				},
				position: {
					type: "text",
					label: "Cargo"
				},
				company: {
					type: "text",
					label: "Empresa"
				},
				testimonial: {
					type: "textarea",
					label: "Depoimento"
				},
				photo: {
					type: "text",
					label: "URL da Foto"
				},
				rating: {
					type: "number",
					label: "Avaliação (1-5)"
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
		title: "O Que Nossos Clientes Dizem",
		description: "Veja o que nossos clientes falam sobre nossos serviços e resultados alcançados.",
		testimonials: [
			{
				name: "Maria Silva",
				position: "Diretora",
				company: "Tech Solutions",
				testimonial: "Excelente trabalho! A equipe superou nossas expectativas e entregou resultados excepcionais.",
				photo: "",
				rating: 5
			},
			{
				name: "João Santos",
				position: "CEO",
				company: "Digital Corp",
				testimonial: "Profissionais altamente qualificados. Recomendo para qualquer empresa que busca qualidade.",
				photo: "",
				rating: 5
			}
		],
		backgroundColor: "#f8f9fa",
		textColor: "#000000"
	},
	render: ({ title, description, testimonials, backgroundColor, textColor, puck }) => {
		const renderStars = (rating: number = 5) => {
			return "★".repeat(rating) + "☆".repeat(5 - rating)
		}

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
						gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
						gap: "2rem"
					}}>
						{testimonials?.map((testimonial, index) => (
							<div key={index} style={{
								padding: "2rem",
								backgroundColor: backgroundColor === "#ffffff" ? "#f8f9fa" : "#ffffff",
								borderRadius: "12px",
								boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
								position: "relative"
							}}>
								<div style={{
									fontSize: "3rem",
									color: "#007bff",
									opacity: 0.3,
									position: "absolute",
									top: "1rem",
									left: "1.5rem",
									fontFamily: "serif",
									lineHeight: 1
								}}>
									"
								</div>

								<div style={{
									marginTop: "1rem",
									marginBottom: "1.5rem"
								}}>
									<p style={{
										margin: "0",
										fontSize: "1.125rem",
										lineHeight: 1.6,
										fontStyle: "italic"
									}}>
										{testimonial.testimonial}
									</p>
								</div>

								{testimonial.rating && (
									<div style={{
										color: "#ffc107",
										fontSize: "1.25rem",
										marginBottom: "1rem"
									}}>
										{renderStars(testimonial.rating)}
									</div>
								)}

								<div style={{
									display: "flex",
									alignItems: "center",
									gap: "1rem"
								}}>
									{testimonial.photo ? (
										<img 
											src={testimonial.photo}
											alt={testimonial.name}
											style={{
												width: "50px",
												height: "50px",
												borderRadius: "50%",
												objectFit: "cover"
											}}
										/>
									) : (
										<div style={{
											width: "50px",
											height: "50px",
											borderRadius: "50%",
											backgroundColor: "#007bff",
											color: "#ffffff",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											fontSize: "1.25rem",
											fontWeight: "bold"
										}}>
											{testimonial.name.charAt(0)}
										</div>
									)}
									
									<div>
										<div style={{
											fontWeight: "600",
											margin: "0"
										}}>
											{testimonial.name}
										</div>
										<div style={{
											fontSize: "0.875rem",
											color: "#6c757d",
											margin: "0"
										}}>
											{testimonial.position} - {testimonial.company}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		)
	}
}