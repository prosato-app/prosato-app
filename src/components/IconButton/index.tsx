import React, { type PropsWithChildren } from "react"

type IconButtonProps = PropsWithChildren<{
	onClick?: () => void;
	size?: "small" | "medium" | "large"
	variant?: "default" | "primary" | "secondary" | "danger"
	disabled?: boolean
	className?: string
	title?: string
}>

const IconButton: React.FC<IconButtonProps> = ({
	onClick,
	size = "medium",
	variant = "default",
	disabled = false,
	className = "",
	title,
	children
}) => {
	const baseClasses = "inline-flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

	const sizeClasses = {
		small: "w-8 h-8 text-sm",
		medium: "w-10 h-10 text-base",
		large: "w-12 h-12 text-lg"
	}

	const variantClasses = {
		default: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400",
		primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 disabled:bg-blue-300",
		secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500 disabled:bg-gray-300",
		danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 disabled:bg-red-300"
	}

	const classes = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
    ${className}
  `.trim()

	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={classes}
			title={title}
		>
			{children}
		</button>
	)
}

export default IconButton
