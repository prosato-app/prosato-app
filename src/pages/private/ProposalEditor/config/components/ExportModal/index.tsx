import React from "react"
import { X, Download, FileText, Code, Printer } from "lucide-react"
import type { Data } from "@measured/puck"

interface ExportModalProps {
	isOpen: boolean
	onClose: () => void
	data: Data
	onExportHTML: () => void
	onExportPDF: () => void
	onExportJSON: () => void
	proposalTitle?: string
}

const ExportModal: React.FC<ExportModalProps> = ({
	isOpen,
	onClose,
	data,
	onExportHTML,
	onExportPDF,
	onExportJSON,
	proposalTitle = "Proposta Comercial"
}) => {
	if (!isOpen) return null

	const stats = {
		componentCount: data.content?.length || 0,
		totalElements: data.content?.length || 0 // Simplified count
	}

	const exportOptions = [
		{
			id: 'html',
			title: 'HTML',
			description: 'Arquivo HTML completo para visualização web',
			icon: <Code size={24} />,
			action: onExportHTML,
			recommended: true
		},
		{
			id: 'pdf',
			title: 'PDF',
			description: 'Documento PDF para impressão e compartilhamento',
			icon: <FileText size={24} />,
			action: onExportPDF,
			recommended: false
		},
		{
			id: 'json',
			title: 'JSON',
			description: 'Dados brutos para backup ou importação',
			icon: <Download size={24} />,
			action: onExportJSON,
			recommended: false
		}
	]

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="relative w-full max-w-md bg-white rounded-lg shadow-xl m-4">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-gray-200">
					<div>
						<h2 className="text-lg font-semibold text-gray-900">
							Exportar Proposta
						</h2>
						<p className="text-sm text-gray-500 mt-1">
							{stats.componentCount} componentes • {stats.totalElements} elementos
						</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
					>
						<X size={20} />
					</button>
				</div>

				{/* Content */}
				<div className="p-4">
					<div className="space-y-3">
						{exportOptions.map((option) => (
							<button
								key={option.id}
								onClick={() => {
									option.action()
									onClose()
								}}
								className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
							>
								<div className="flex items-start gap-3">
									<div className="text-blue-600 mt-1">
										{option.icon}
									</div>
									<div className="flex-1">
										<div className="flex items-center gap-2">
											<h3 className="font-medium text-gray-900">
												{option.title}
											</h3>
											{option.recommended && (
												<span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
													Recomendado
												</span>
											)}
										</div>
										<p className="text-sm text-gray-500 mt-1">
											{option.description}
										</p>
									</div>
									<Download size={16} className="text-gray-400 mt-1" />
								</div>
							</button>
						))}
					</div>

					{/* Info */}
					<div className="mt-4 p-3 bg-gray-50 rounded-lg">
						<div className="flex items-start gap-2">
							<Printer size={16} className="text-gray-400 mt-0.5" />
							<div className="text-sm text-gray-600">
								<p className="font-medium">Dica para impressão</p>
								<p>Use o formato PDF para melhor qualidade na impressão e compartilhamento profissional.</p>
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="p-4 border-t border-gray-200 bg-gray-50">
					<div className="flex items-center justify-between text-sm text-gray-500">
						<span>Título: {proposalTitle}</span>
						<span>Tamanho: ~{Math.round(JSON.stringify(data).length / 1024)}KB</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ExportModal