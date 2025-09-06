import { Save, Eye, Download, Share2, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface EditorToolbarProps {
	proposalTitle?: string;
	onSave?: () => void;
	onPreview?: () => void;
	onExportPDF?: () => void;
	onShare?: () => void;
}

export function CustomHeader({
	proposalTitle = "Proposta sem título",
	onSave,
	onPreview,
	onExportPDF,
	onShare
}: EditorToolbarProps) {
	const navigate = useNavigate()

	const handleBack = () => {
		navigate("/proposals")
	}

	return (
		<div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
			<div className="flex items-center gap-4">
				<button 
					onClick={handleBack}
					className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
				>
					<ArrowLeft className="h-4 w-4" />
					Voltar
				</button>
				<div className="h-6 w-px bg-gray-300" />
				<h1 className="text-lg font-semibold text-gray-900">Editor de Propostas</h1>
				<div className="h-6 w-px bg-gray-300" />
				<span className="text-sm text-gray-600">{proposalTitle}</span>
			</div>

			<div className="flex items-center gap-2">
				<button 
					className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors" 
					onClick={onPreview}
				>
					<Eye className="h-4 w-4" />
					Preview
				</button>
				<button 
					className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors" 
					onClick={onExportPDF}
				>
					<Download className="h-4 w-4" />
					PDF
				</button>
				<button 
					className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors" 
					onClick={onShare}
				>
					<Share2 className="h-4 w-4" />
					Compartilhar
				</button>
				<button 
					className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors" 
					onClick={onSave}
				>
					<Save className="h-4 w-4" />
					Salvar
				</button>
			</div>
		</div>
	)
}
