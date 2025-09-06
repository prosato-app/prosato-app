import React, { useEffect, useRef } from "react"
import { X, Monitor, Smartphone, Tablet, Download, Share2 } from "lucide-react"
import { Render } from "@measured/puck"
import type { Data } from "@measured/puck"
import puckConfig from "@/pages/private/ProposalEditor/config"

interface PreviewModalProps {
	isOpen: boolean
	onClose: () => void
	data: Data
	onExport?: () => void
	onShare?: () => void
}

type ViewportSize = "desktop" | "tablet" | "mobile"

const PreviewModal: React.FC<PreviewModalProps> = ({
	isOpen,
	onClose,
	data,
	onExport,
	onShare
}) => {
	const [viewport, setViewport] = React.useState<ViewportSize>("desktop")
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleEscape)
			document.body.style.overflow = 'hidden'
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
			document.body.style.overflow = 'unset'
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	const getViewportStyles = () => {
		switch (viewport) {
			case "mobile":
				return { width: "375px", height: "667px" }
			case "tablet":
				return { width: "768px", height: "1024px" }
			case "desktop":
			default:
				return { width: "100%", height: "100%" }
		}
	}

	const getViewportClass = () => {
		switch (viewport) {
			case "mobile":
				return "max-w-sm mx-auto"
			case "tablet":
				return "max-w-3xl mx-auto"
			case "desktop":
			default:
				return "w-full"
		}
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div
				ref={modalRef}
				className="relative w-full h-full max-w-7xl max-h-full bg-white rounded-lg shadow-xl overflow-hidden m-4"
			>
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
					<div className="flex items-center gap-4">
						<h2 className="text-lg font-semibold text-gray-900">
							Preview da Proposta
						</h2>
						
						{/* Viewport Controls */}
						<div className="flex items-center gap-1 bg-white rounded-md border border-gray-300">
							<button
								onClick={() => setViewport("desktop")}
								className={`p-2 rounded-l-md ${
									viewport === "desktop"
										? "bg-blue-500 text-white"
										: "text-gray-600 hover:bg-gray-100"
								}`}
							>
								<Monitor size={16} />
							</button>
							<button
								onClick={() => setViewport("tablet")}
								className={`p-2 ${
									viewport === "tablet"
										? "bg-blue-500 text-white"
										: "text-gray-600 hover:bg-gray-100"
								}`}
							>
								<Tablet size={16} />
							</button>
							<button
								onClick={() => setViewport("mobile")}
								className={`p-2 rounded-r-md ${
									viewport === "mobile"
										? "bg-blue-500 text-white"
										: "text-gray-600 hover:bg-gray-100"
								}`}
							>
								<Smartphone size={16} />
							</button>
						</div>
					</div>

					<div className="flex items-center gap-2">
						{/* Export Button */}
						{onExport && (
							<button
								onClick={onExport}
								className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
							>
								<Download size={16} />
								Exportar
							</button>
						)}

						{/* Share Button */}
						{onShare && (
							<button
								onClick={onShare}
								className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
							>
								<Share2 size={16} />
								Compartilhar
							</button>
						)}

						{/* Close Button */}
						<button
							onClick={onClose}
							className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
						>
							<X size={20} />
						</button>
					</div>
				</div>

				{/* Preview Content */}
				<div className="flex-1 overflow-auto bg-gray-100 p-4" style={{ height: "calc(100% - 80px)" }}>
					<div
						className={`bg-white shadow-lg rounded-lg overflow-auto transition-all duration-300 ${getViewportClass()}`}
						style={getViewportStyles()}
					>
						<div className="h-full overflow-auto">
							<Render config={puckConfig} data={data} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PreviewModal