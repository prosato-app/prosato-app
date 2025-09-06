import { forwardRef, type CSSProperties, type ReactNode } from "react"

export type SectionProps = {
	className?: string
	children: ReactNode
	maxWidth?: string
	style?: CSSProperties
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
	({ children, maxWidth = "1280px", style = {}, className }, ref) => {
		return (
			<section
				className={`w-full ${className || ""}`}
				style={{
					...style
				}}
				ref={ref}
			>
				<div 
					className="mx-auto px-4"
					style={{ maxWidth }}
				>
					{children}
				</div>
			</section>
		)
	}
)
