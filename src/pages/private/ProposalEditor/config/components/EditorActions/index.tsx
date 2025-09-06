import React, { useState } from "react"
import { Eye, Download, Save, Share2, FileText } from "lucide-react"
import type { Data } from "@measured/puck"

interface EditorActionsProps {
	data: Data
	onSave?: () => void
	onPreview?: () => void
	onPublish?: () => void
	onExport?: () => void
	isLoading?: boolean
}

const EditorActions: React.FC<EditorActionsProps> = ({
	data,
	onSave,
	onPreview,
	onPublish,
	onExport,
	isLoading = false
}) => {
	const [isSaving, setIsSaving] = useState(false)

	const handleSave = async () => {
		if (onSave && !isSaving) {
			setIsSaving(true)
			try {
				await onSave()
			} finally {
				setIsSaving(false)
			}
		}
	}

	const handlePreview = () => {
		if (onPreview) {
			onPreview()
		}
	}

	const handlePublish = () => {
		if (onPublish) {
			onPublish()
		}
	}

	const handleExport = () => {
		if (onExport) {
			onExport()
		}
	}

	return (
		<div className="flex items-center gap-2 p-3 bg-white border-b border-gray-200">
			{/* Save Button */}
			<button
				onClick={handleSave}
				disabled={isSaving || isLoading}
				className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<Save size={16} />
				{isSaving ? 'Salvando...' : 'Salvar'}
			</button>

			{/* Preview Button */}
			<button
				onClick={handlePreview}
				disabled={isLoading}
				className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<Eye size={16} />
				Preview
			</button>

			{/* Export Button */}
			<button
				onClick={handleExport}
				disabled={isLoading}
				className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<Download size={16} />
				Exportar
			</button>

			{/* Publish Button */}
			<button
				onClick={handlePublish}
				disabled={isLoading}
				className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
			>
				<Share2 size={16} />
				Publicar
			</button>

			{/* Component Count */}
			<div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 bg-gray-50 rounded-md">
				<FileText size={16} />
				{data.content?.length || 0} componentes
			</div>
		</div>
	)
}

export default EditorActions