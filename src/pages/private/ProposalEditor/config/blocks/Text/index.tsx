import type { ComponentConfig } from "@measured/puck"

export type TextProps = {
	text?: string
	color: "default" | "muted"
}

export const Text: ComponentConfig<TextProps> = {
	fields: {
		text: {
			type: "text",
			placeholder: "Ola"
		},
		color: {
			type: "radio",
			options: [
				{ label: "Default", value: "default" },
				{ label: "Muted", value: "muted" }
			]
		}
	},
	defaultProps: {
		text: "Text",
		color: "default"
	},
	render: ({ text, color, puck }) => {
		return (
			<p
				ref={puck.dragRef}
				style={{
					color: color === "default" ? "black" : "gray",
					margin: "0 0 16px 0",
					lineHeight: 1.5
				}}
			>
				{text}
			</p>
		)
	}
}
