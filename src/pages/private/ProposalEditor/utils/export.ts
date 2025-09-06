import type { Data } from "@measured/puck"
import puckConfig from "@/pages/private/ProposalEditor/config"

export const exportToHTML = (data: Data, title: string = "Proposta Comercial") => {
	// Generate HTML from Puck data
	const renderComponentToHTML = (component: any): string => {
		const { type, props } = component
		const componentConfig = puckConfig.components[type as keyof typeof puckConfig.components]
		
		if (!componentConfig) {
			return `<!-- Unknown component: ${type} -->`
		}

		// This is a simplified HTML generation - in a real app you'd want more sophisticated rendering
		switch (type) {
			case "Text":
				return `<p style="color: ${props.color === 'muted' ? 'gray' : 'black'}; margin: 0 0 16px 0; line-height: 1.5;">${props.text || ''}</p>`
			
			case "Header":
				return `
					<header style="background-color: ${props.backgroundColor}; color: ${props.textColor}; padding: 2rem; text-align: center; border-bottom: 1px solid #e9ecef;">
						${props.logo ? `<img src="${props.logo}" alt="${props.companyName} logo" style="max-height: 80px; margin-bottom: 1rem;" />` : ''}
						<h1 style="font-size: 2rem; font-weight: bold; margin: 0 0 0.5rem 0;">${props.companyName || ''}</h1>
						${props.subtitle ? `<p style="font-size: 1.125rem; margin: 0; opacity: 0.8;">${props.subtitle}</p>` : ''}
					</header>
				`
			
			case "HeroSection":
				return `
					<section style="background-color: ${props.backgroundColor}; color: ${props.textColor}; text-align: ${props.textAlign}; padding: 4rem 2rem; min-height: 400px; display: flex; align-items: center; justify-content: center;">
						<div style="max-width: 800px;">
							${props.subtitle ? `<p style="font-size: 1.125rem; margin: 0 0 1rem 0; opacity: 0.9;">${props.subtitle}</p>` : ''}
							<h1 style="font-size: 3rem; font-weight: bold; margin: 0 0 1.5rem 0; line-height: 1.2;">${props.title || ''}</h1>
							${props.description ? `<p style="font-size: 1.25rem; margin: 0; line-height: 1.6; opacity: 0.95;">${props.description}</p>` : ''}
						</div>
					</section>
				`
			
			default:
				return `<div><!-- ${type} component --></div>`
		}
	}

	const htmlContent = data.content?.map(renderComponentToHTML).join('\n') || ''

	const fullHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${title}</title>
	<style>
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
		
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			line-height: 1.6;
			color: #333;
		}
		
		.container {
			max-width: 1200px;
			margin: 0 auto;
			padding: 0 20px;
		}
		
		@media print {
			body {
				print-color-adjust: exact;
			}
		}
	</style>
</head>
<body>
	${htmlContent}
</body>
</html>
	`.trim()

	return fullHTML
}

export const downloadAsHTML = (data: Data, filename: string = "proposta") => {
	const html = exportToHTML(data)
	const blob = new Blob([html], { type: 'text/html' })
	const url = URL.createObjectURL(blob)
	
	const link = document.createElement('a')
	link.href = url
	link.download = `${filename}.html`
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
}

export const downloadAsPDF = async (data: Data, filename: string = "proposta") => {
	// This would require a PDF generation library like jsPDF or Puppeteer
	// For now, we'll use the browser's print functionality
	const html = exportToHTML(data)
	
	// Open in new window for printing
	const printWindow = window.open('', '_blank')
	if (printWindow) {
		printWindow.document.write(html)
		printWindow.document.close()
		
		// Wait for content to load, then print
		printWindow.onload = () => {
			setTimeout(() => {
				printWindow.print()
			}, 500)
		}
	}
}

export const exportToJSON = (data: Data) => {
	return JSON.stringify(data, null, 2)
}

export const downloadAsJSON = (data: Data, filename: string = "proposta") => {
	const json = exportToJSON(data)
	const blob = new Blob([json], { type: 'application/json' })
	const url = URL.createObjectURL(blob)
	
	const link = document.createElement('a')
	link.href = url
	link.download = `${filename}.json`
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
}

export const shareProposal = async (data: Data, title: string = "Proposta Comercial") => {
	if (navigator.share) {
		// Use native sharing API if available
		try {
			await navigator.share({
				title,
				text: 'Confira esta proposta comercial',
				url: window.location.href
			})
		} catch (error) {
			console.log('Sharing cancelled or failed:', error)
		}
	} else {
		// Fallback: copy URL to clipboard
		try {
			await navigator.clipboard.writeText(window.location.href)
			alert('Link copiado para a área de transferência!')
		} catch (error) {
			// Fallback for clipboard API
			const textArea = document.createElement('textarea')
			textArea.value = window.location.href
			document.body.appendChild(textArea)
			textArea.select()
			document.execCommand('copy')
			document.body.removeChild(textArea)
			alert('Link copiado para a área de transferência!')
		}
	}
}