import { useState, useCallback } from "react"
import type { Data } from "@measured/puck"
import { downloadAsHTML, downloadAsPDF, downloadAsJSON, shareProposal } from "../utils/export"

export interface UseProposalEditorProps {
	initialData?: Data
	onSave?: (data: Data) => Promise<void>
	onPublish?: (data: Data) => Promise<void>
	proposalId?: string
}

export const useProposalEditor = ({
	initialData,
	onSave,
	onPublish,
	proposalId
}: UseProposalEditorProps = {}) => {
	const [data, setData] = useState<Data>(initialData || { content: [], zones: {} })
	const [isPreviewOpen, setIsPreviewOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isSaving, setIsSaving] = useState(false)

	// Handle data changes from Puck
	const handleDataChange = useCallback((newData: Data) => {
		setData(newData)
	}, [])

	// Save function
	const handleSave = useCallback(async () => {
		if (!onSave) return

		setIsSaving(true)
		try {
			await onSave(data)
			// You could show a success toast here
		} catch (error) {
			console.error('Error saving proposal:', error)
			// You could show an error toast here
		} finally {
			setIsSaving(false)
		}
	}, [data, onSave])

	// Preview function
	const handlePreview = useCallback(() => {
		setIsPreviewOpen(true)
	}, [])

	// Close preview
	const handleClosePreview = useCallback(() => {
		setIsPreviewOpen(false)
	}, [])

	// Publish function
	const handlePublish = useCallback(async () => {
		if (!onPublish) return

		setIsLoading(true)
		try {
			await onPublish(data)
			// You could show a success toast and redirect
		} catch (error) {
			console.error('Error publishing proposal:', error)
			// You could show an error toast here
		} finally {
			setIsLoading(false)
		}
	}, [data, onPublish])

	// Export functions
	const handleExportHTML = useCallback(() => {
		const filename = proposalId ? `proposta-${proposalId}` : "proposta"
		downloadAsHTML(data, filename)
	}, [data, proposalId])

	const handleExportPDF = useCallback(() => {
		const filename = proposalId ? `proposta-${proposalId}` : "proposta"
		downloadAsPDF(data, filename)
	}, [data, proposalId])

	const handleExportJSON = useCallback(() => {
		const filename = proposalId ? `proposta-${proposalId}` : "proposta"
		downloadAsJSON(data, filename)
	}, [data, proposalId])

	// Share function
	const handleShare = useCallback(async () => {
		const title = proposalId ? `Proposta ${proposalId}` : "Proposta Comercial"
		await shareProposal(data, title)
	}, [data, proposalId])

	// Auto-save functionality (optional)
	const enableAutoSave = useCallback((intervalMs: number = 30000) => {
		const interval = setInterval(() => {
			if (onSave && data.content && data.content.length > 0) {
				handleSave()
			}
		}, intervalMs)

		return () => clearInterval(interval)
	}, [handleSave, onSave, data])

	// Get proposal stats
	const getProposalStats = useCallback(() => {
		const componentCount = data.content?.length || 0
		const zoneCount = Object.keys(data.zones || {}).length
		let totalElements = componentCount
		
		// Count elements in zones
		Object.values(data.zones || {}).forEach(zone => {
			Object.values(zone).forEach((zoneContent: any) => {
				totalElements += zoneContent?.length || 0
			})
		})

		return {
			componentCount,
			zoneCount,
			totalElements,
			isEmpty: componentCount === 0,
			hasContent: componentCount > 0
		}
	}, [data])

	return {
		// State
		data,
		isPreviewOpen,
		isLoading,
		isSaving,
		
		// Handlers
		handleDataChange,
		handleSave,
		handlePreview,
		handleClosePreview,
		handlePublish,
		
		// Export handlers
		handleExportHTML,
		handleExportPDF,
		handleExportJSON,
		handleShare,
		
		// Utilities
		enableAutoSave,
		getProposalStats,
		
		// Direct data setters (for advanced use cases)
		setData,
		setIsPreviewOpen,
		setIsLoading
	}
}