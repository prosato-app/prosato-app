import type { ComponentConfig } from "@measured/puck"

export type HeaderProps = {
	logo?: string
	companyName?: string
	subtitle?: string
	backgroundColor?: string
	textColor?: string
}

export const Header: ComponentConfig<HeaderProps> = {
	fields: {
		logo: {
			type: "text",
			label: "URL do Logo"
		},
		companyName: {
			type: "text",
			label: "Nome da Empresa"
		},
		subtitle: {
			type: "text",
			label: "Subtítulo"
		},
		backgroundColor: {
			type: "select",
			label: "Cor de Fundo",
			options: [
				{ label: "Branco", value: "#ffffff" },
				{ label: "Cinza Claro", value: "#f8f9fa" },
				{ label: "Azul", value: "#007bff" },
				{ label: "Azul Escuro", value: "#003d7a" }
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
		}
	},
	defaultProps: {
		companyName: "Sua Empresa",
		subtitle: "Proposta Comercial",
		backgroundColor: "#ffffff",
		textColor: "#000000"
	},
	render: ({ logo, companyName, subtitle, backgroundColor, textColor, puck }) => {
		return (
			<header 
				ref={puck.dragRef}
				style={{
					backgroundColor,
					color: textColor,
					padding: "2rem",
					textAlign: "center",
					borderBottom: "1px solid #e9ecef"
				}}
			>
				{logo && (
					<img 
						src={logo} 
						alt={`${companyName} logo`}
						style={{
							maxHeight: "80px",
							marginBottom: "1rem"
						}}
					/>
				)}
				<h1 style={{
					fontSize: "2rem",
					fontWeight: "bold",
					margin: "0 0 0.5rem 0"
				}}>
					{companyName}
				</h1>
				{subtitle && (
					<p style={{
						fontSize: "1.125rem",
						margin: "0",
						opacity: 0.8
					}}>
						{subtitle}
					</p>
				)}
			</header>
		)
	}
}