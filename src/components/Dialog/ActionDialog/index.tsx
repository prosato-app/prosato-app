import { type MouseEventHandler, type PropsWithChildren, type ReactNode, useEffect, useRef, useState } from "react"

type ActionDialogProps = PropsWithChildren<{
	title: string
	content: ReactNode
	onSave: () => Promise<void> | void
}>

const ActionDialog = (props: ActionDialogProps) => {
	const {
		title,
		children,
		content,
		onSave
	} = props

	const [openDialog, setOpenDialog] = useState(false)

	const overlayRef = useRef<HTMLDivElement>(null)
	const panelRef = useRef(null)

	const handleOpen = () => {
		setOpenDialog(true)
	}

	const handleClose = () => {
		setOpenDialog(false)
	}

	const handleSave = async () => {
		await onSave()
	}

	const onOverlayClick = (event: MouseEventHandler<HTMLDivElement, MouseEvent>) => {
		if (event.target === overlayRef.current) handleClose()
	}

	useEffect(() => {
		panelRef.current?.focus()
	})

	const dialog = () => {
		return (
			<div
				ref={overlayRef}
				onClick={onOverlayClick}
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
				aria-labelledby="modal-title"
				role="dialog"
				aria-modal="true"
			>
				<form
					ref={panelRef}
					tabIndex={-1}
					className="w-full max-w-lg rounded-xl bg-white shadow-xl ring-1 ring-black/5 p-6 animate-in fade-in zoom-in duration-150"
					onSubmit={handleSave}
				>
					<div className="flex items-start justify-between">
						<div className="sr-only" id="modal-title">Modal</div>
						<button
							onClick={handleClose}
							className="ml-auto -mr-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							aria-label="Fechar"
							title="Fechar"
						>
							<i className="fa-solid fa-xmark"></i>
						</button>
					</div>
					<div className="space-y-4">
						<h2 className="text-xl font-semibold">{title}</h2>
						{content}
					</div>
					<div className="flex items-center justify-end gap-3 pt-2">
						<button
							onClick={handleClose}
							className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
						>
							Cancelar
						</button>
						<button
							className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
							type={"submit"}
						>
							Confirmar
						</button>
					</div>
				</form>
			</div>
		)
	}

	return (
		<div>
			<div onClick={handleOpen}>
				{children}
			</div>
			{openDialog && dialog()}
		</div>
	)
}

export default ActionDialog
