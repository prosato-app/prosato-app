import type { Data } from "@measured/puck"

export interface ProposalTemplate {
	id: string
	name: string
	description: string
	data: Data
	createdAt: string
	updatedAt: string
}

export interface SavedProposal {
	id: string
	title: string
	clientName?: string
	data: Data
	templateId?: string
	createdAt: string
	updatedAt: string
}

class ProposalEditorService {
	private readonly PROPOSALS_KEY = "proposals"
	private readonly TEMPLATES_KEY = "proposal-templates"

	// Gerenciamento de Propostas
	async saveProposal(proposal: Omit<SavedProposal, "id" | "createdAt" | "updatedAt"> & { id?: string }): Promise<string> {
		const timestamp = new Date().toISOString()
		const id = proposal.id || `proposal-${Date.now()}`

		const savedProposal: SavedProposal = {
			...proposal,
			id,
			createdAt: proposal.id ? this.getProposal(proposal.id)?.createdAt || timestamp : timestamp,
			updatedAt: timestamp
		}

		const proposals = this.getAllProposals()
		const existingIndex = proposals.findIndex(p => p.id === id)

		if (existingIndex >= 0) {
			proposals[existingIndex] = savedProposal
		} else {
			proposals.push(savedProposal)
		}

		localStorage.setItem(this.PROPOSALS_KEY, JSON.stringify(proposals))
		return id
	}

	getProposal(id: string): SavedProposal | null {
		const proposals = this.getAllProposals()
		return proposals.find(p => p.id === id) || null
	}

	getAllProposals(): SavedProposal[] {
		const stored = localStorage.getItem(this.PROPOSALS_KEY)
		return stored ? JSON.parse(stored) : []
	}

	deleteProposal(id: string): boolean {
		const proposals = this.getAllProposals()
		const filteredProposals = proposals.filter(p => p.id !== id)
		
		if (filteredProposals.length === proposals.length) {
			return false // Proposta não encontrada
		}

		localStorage.setItem(this.PROPOSALS_KEY, JSON.stringify(filteredProposals))
		return true
	}

	// Gerenciamento de Templates
	async saveTemplate(template: Omit<ProposalTemplate, "id" | "createdAt" | "updatedAt"> & { id?: string }): Promise<string> {
		const timestamp = new Date().toISOString()
		const id = template.id || `template-${Date.now()}`

		const savedTemplate: ProposalTemplate = {
			...template,
			id,
			createdAt: template.id ? this.getTemplate(template.id)?.createdAt || timestamp : timestamp,
			updatedAt: timestamp
		}

		const templates = this.getAllTemplates()
		const existingIndex = templates.findIndex(t => t.id === id)

		if (existingIndex >= 0) {
			templates[existingIndex] = savedTemplate
		} else {
			templates.push(savedTemplate)
		}

		localStorage.setItem(this.TEMPLATES_KEY, JSON.stringify(templates))
		return id
	}

	getTemplate(id: string): ProposalTemplate | null {
		const templates = this.getAllTemplates()
		return templates.find(t => t.id === id) || null
	}

	getAllTemplates(): ProposalTemplate[] {
		const stored = localStorage.getItem(this.TEMPLATES_KEY)
		return stored ? JSON.parse(stored) : []
	}

	deleteTemplate(id: string): boolean {
		const templates = this.getAllTemplates()
		const filteredTemplates = templates.filter(t => t.id !== id)
		
		if (filteredTemplates.length === templates.length) {
			return false // Template não encontrado
		}

		localStorage.setItem(this.TEMPLATES_KEY, JSON.stringify(filteredTemplates))
		return true
	}

	// Criar proposta a partir de template
	createFromTemplate(templateId: string, title: string, clientName?: string): SavedProposal | null {
		const template = this.getTemplate(templateId)
		if (!template) return null

		return {
			id: `proposal-${Date.now()}`,
			title,
			clientName,
			data: template.data,
			templateId,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		}
	}

	// Export/Import
	exportProposal(id: string): string | null {
		const proposal = this.getProposal(id)
		return proposal ? JSON.stringify(proposal, null, 2) : null
	}

	importProposal(jsonData: string): SavedProposal | null {
		try {
			const proposal = JSON.parse(jsonData) as SavedProposal
			// Validação básica
			if (!proposal.data || !proposal.title) {
				throw new Error("Formato inválido")
			}
			return proposal
		} catch (error) {
			console.error("Erro ao importar proposta:", error)
			return null
		}
	}
}

// Singleton
export const proposalEditorService = new ProposalEditorService()
export default proposalEditorService