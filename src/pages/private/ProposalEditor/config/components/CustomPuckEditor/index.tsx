import React from "react"
import puckConfig from "@/pages/private/ProposalEditor/config"
import { Puck, type Data } from "@measured/puck"
import CustomComponentItem from "@/pages/private/ProposalEditor/config/components/CustomComponentItem"
import "@measured/puck/puck.css"
import { CustomPropsDrawer } from "@/pages/private/ProposalEditor/config/components/CustomPropsDrawer"
import StructureFooter from "@/pages/private/ProposalEditor/config/components/StructureFooter"
import EditorActions from "@/pages/private/ProposalEditor/config/components/EditorActions"
import PreviewModal from "@/pages/private/ProposalEditor/config/components/PreviewModal"
import ExportModal from "@/pages/private/ProposalEditor/config/components/ExportModal"
import { useProposalEditor } from "@/pages/private/ProposalEditor/hooks/useProposalEditor"

interface EditorCanvasProps {
	data: Data;
	onDataChange?: (data: Data) => void;
	onSave?: (data: Data) => Promise<void>;
	onPublish?: (data: Data) => Promise<void>;
	proposalId?: string;
	proposalTitle?: string;
}

export function CustomPuckEditor({ 
	data, 
	onDataChange, 
	onSave, 
	onPublish,
	proposalId,
	proposalTitle = "Proposta Comercial"
}: EditorCanvasProps) {
	const {
		isPreviewOpen,
		isLoading,
		isSaving,
		handlePreview,
		handleClosePreview,
		handleSave,
		handlePublish,
		handleExportHTML,
		handleExportPDF,
		handleExportJSON,
		handleShare
	} = useProposalEditor({
		initialData: data,
		onSave,
		onPublish,
		proposalId
	})

	const [isExportModalOpen, setIsExportModalOpen] = React.useState(false)

	const handleExport = () => {
		setIsExportModalOpen(true)
	}

	const handleDataChangeWithHook = (newData: Data) => {
		if (onDataChange) {
			onDataChange(newData)
		}
	}

	return (
		<div className="flex-1 bg-gray-100 flex flex-col">
			{/* Editor Actions */}
			<EditorActions
				data={data}
				onSave={handleSave}
				onPreview={handlePreview}
				onPublish={handlePublish}
				onExport={handleExport}
				isLoading={isLoading}
			/>

			{/* Main Editor */}
			<div className="flex-1">
				<div className="h-full w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
					<Puck
						config={puckConfig}
						data={data}
						onChange={handleDataChangeWithHook}
						onPublish={handlePublish}
						iframe={{
							enabled: false
						}}
						renderHeader={() => <></>}
						overrides={{
							componentItem: CustomComponentItem,
							fields: CustomPropsDrawer,
							outline: ({ children }) => (
								<div className="flex flex-col h-full">
									<div className="flex-1 overflow-hidden">
										{children}
									</div>
									<StructureFooter />
								</div>
							)
						}}
						ui={{
							leftSideBarVisible: true,
							rightSideBarVisible: true
						}}
					/>
				</div>
			</div>

			{/* Preview Modal */}
			<PreviewModal
				isOpen={isPreviewOpen}
				onClose={handleClosePreview}
				data={data}
				onExport={handleExport}
				onShare={handleShare}
			/>

			{/* Export Modal */}
			<ExportModal
				isOpen={isExportModalOpen}
				onClose={() => setIsExportModalOpen(false)}
				data={data}
				onExportHTML={handleExportHTML}
				onExportPDF={handleExportPDF}
				onExportJSON={handleExportJSON}
				proposalTitle={proposalTitle}
			/>
		</div>
	)
}
