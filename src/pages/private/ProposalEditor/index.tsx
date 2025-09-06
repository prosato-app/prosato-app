import "@measured/puck/puck.css"
import { type Data } from "@measured/puck"
import { CustomPuckEditor } from "@/pages/private/ProposalEditor/config/components/CustomPuckEditor"
import { CustomHeader } from "@/pages/private/ProposalEditor/config/components/CustomHeader"
const initialData: Data = {
	content: [],
	root: {}
}

interface ProposalEditorProps {
	data?: Data;
	onSave?: (data: Data) => void;
}

export function ProposalEditor({ data = initialData, onSave }: ProposalEditorProps) {
	const handlePublish = (data: Data) => {
		console.log("Published:", data)
		// Salvar no backend/localStorage
		localStorage.setItem("page-data", JSON.stringify(data))
	}

	const handleSave = () => {
		console.log("Saving proposal:", data)
		onSave?.(data)
	}

	const handleDataChange = (newData: Data) => {
		console.log("Data changed:", newData)
		onSave?.(newData)
	}

	const handlePreview = () => {
		console.log("Preview proposal")
	}

	const handleExportPDF = () => {
		console.log("Export to PDF")
	}

	const handleShare = () => {
		console.log("Share proposal")
	}

	return (
		<div className="h-screen w-full flex flex-col bg-background">
			<CustomHeader
				proposalTitle={data.root?.props?.title || "Proposta sem título"}
				onSave={handleSave}
				onPreview={handlePreview}
				onExportPDF={handleExportPDF}
				onShare={handleShare}
			/>

			<div className="flex-1 flex overflow-hidden">
				<CustomPuckEditor
					data={data}
					onDataChange={handleDataChange}
				/>
			</div>
		</div>
	)
}
