import React, { type PropsWithChildren, type ReactNode, useEffect, useRef, useState } from "react"

type MenuOption = {
	name: string
	onClick: () => void
}

type PopoverProps = PropsWithChildren<{
	content?: ReactNode
	menuOptions?: MenuOption[]
	position?: "top" | "bottom" | "left" | "right"
	trigger?: "click" | "hover"
	className?: string
	disabled?: boolean
}>

const Popover: React.FC<PopoverProps> = ({
	children,
	content,
	menuOptions,
	position = "bottom",
	trigger = "click",
	className = "",
	disabled = false
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const popoverRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLDivElement>(null)

	const handleToggle = () => {
		if (!disabled) {
			setIsOpen(!isOpen)
		}
	}

	const handleMouseEnter = () => {
		if (trigger === "hover" && !disabled) {
			setIsOpen(true)
		}
	}

	const handleMouseLeave = () => {
		if (trigger === "hover" && !disabled) {
			setIsOpen(false)
		}
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (
			popoverRef.current &&
			triggerRef.current &&
			!popoverRef.current.contains(event.target as Node) &&
			!triggerRef.current.contains(event.target as Node)
		) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		if (isOpen && trigger === "click") {
			document.addEventListener("mousedown", handleClickOutside)
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [isOpen, trigger])

	const positionClasses = {
		top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
		bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
		left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
		right: "left-full ml-2 top-1/2 transform -translate-y-1/2"
	}

	const arrowClasses = {
		top: "top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-800",
		bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-800",
		left: "left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-800",
		right: "right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-800"
	}

	return (
		<div className="relative inline-block">
			<div
				ref={triggerRef}
				onClick={trigger === "click" ? handleToggle : undefined}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className={`cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
			>
				{children}
			</div>

			{isOpen && (
				<div
					ref={popoverRef}
					className={`
						absolute z-[9999] 
						${positionClasses[position]}
						${className}
					`}
					onMouseEnter={trigger === "hover" ? handleMouseEnter : undefined}
					onMouseLeave={trigger === "hover" ? handleMouseLeave : undefined}
				>
					{menuOptions ? (
						<div className="bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-48 flex flex-col">
							{menuOptions.map((option, index) => (
								<button
									key={index}
									onClick={() => {
										option.onClick()
										setIsOpen(false)
									}}
									className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
								>
									{option.name}
								</button>
							))}
						</div>
					) : (
						<div className="bg-gray-800 text-white text-sm rounded-lg shadow-lg px-3 py-2 max-w-xs">
							{content}
							<div
								className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Popover
