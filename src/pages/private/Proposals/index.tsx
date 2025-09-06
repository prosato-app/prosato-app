import Board from "@/pages/private/Proposals/board"
import customStyles from "@/styles/customStyles"
import { Plus as AddIcon, Edit as EditIcon } from "lucide-react"
import ActionDialog from "@/components/Dialog/ActionDialog"
import useController from "@/pages/private/Proposals/use-controller"
import { Link } from "react-router-dom"

const Proposals = () => {
	const {
		errors,
		handleCreateProposal,
		register
	} = useController()

	return (
		<div className="h-screen w-full bg-gradient-subtle">
			<div className="container mx-auto px-4 py-4 h-full">
				<div className="w-full h-full">
					<div className="flex w-full h-2/12">
						<div className="flex p-2.5 w-full items-center justify-between">
							<div className="flex items-center">
								<h1 className="text-5xl">Propostas</h1>
							</div>
							<div className="flex gap-3">
								<ActionDialog
									title="Criar Proposta"
									content={(
										<>
											<div className="flex flex-col">
												<label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome</label>
												<input
													id="nome"
													type="text"
													placeholder="Nome da Proposta"
													className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
													{...register("title")}
												/>
												{errors.title && (
													<span className="text-red-600 text-sm mt-1 block">
														{errors.title.message}
													</span>
												)}
											</div>
											<div className="flex flex-col">
												<label htmlFor="expiracao" className="text-sm font-medium text-gray-700">Data de Expiração</label>
												<input
													id="expiracao"
													type="month"
													className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
													{...register("expirationDate")}
												/>
												{errors.expirationDate && (
													<span className="text-red-600 text-sm mt-1 block">
														{errors.expirationDate.message}
													</span>
												)}
											</div>
										</>
									)}
									onSave={handleCreateProposal}
								>
									<button
										className="rounded-xl flex items-center gap-1 px-4 py-2 text-lg hover:cursor-pointer"
										style={{
											background: customStyles.colors.primary[500],
											color: customStyles.colors.neutral[50]
										}}
									>
										<AddIcon />
										Criar Proposta
									</button>
								</ActionDialog>
							</div>
						</div>
					</div>
					<div className="w-full h-10/12">
						<Board />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Proposals
