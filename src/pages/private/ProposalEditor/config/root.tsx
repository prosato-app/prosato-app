import type { DefaultRootProps, RootConfig } from "@measured/puck"

export type RootProps = {
	title?: string
	theme?: "light" | "dark"
	maxWidth?: number
}

export const Root: RootConfig<RootProps> = {
	fields: {
		title: {
			type: "text" as const,
			label: "Page Title"
		},
		theme: {
			type: "select" as const,
			label: "Theme",
			options: [
				{ label: "Light", value: "light" },
				{ label: "Dark", value: "dark" }
			]
		},
		maxWidth: {
			type: "number" as const,
			label: "Max Width (px)"
		}
	},
	defaultProps: {
		title: "My Page",
		theme: "light" as const,
		maxWidth: 1200
	},
	render: ({ children, title, theme, maxWidth }) => {
		return (
			<div
				style={{
					padding: 20,
					fontFamily: "system-ui, sans-serif",
					backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
					color: theme === "dark" ? "#ffffff" : "#000000",
					minHeight: "100vh"
				}}
			>
				<div
					style={{
						maxWidth: maxWidth ? `${maxWidth}px` : "100%",
						margin: "0 auto"
					}}
				>
					<div
						style={{
							minHeight: 400,
							border: "2px dashed #cbd5e1",
							borderRadius: "8px",
							padding: 24,
							textAlign: "center",
							color: "#64748b"
						}}
					>
						{children}
					</div>
				</div>
			</div>
		)
	}
}

export default Root
