import customStyles from "@/styles/customStyles"
import type { ReactNode } from "react"

type TagType = "INFO" | "SUCCESS" | "ERROR"

type TagProps = {
	type: TagType
	name: string
	icon?: ReactNode
}

const Tag = (props: TagProps) => {
	const {
		type,
		name,
		icon
	} = props

	const tagTypeToTagStyle: Record<TagType, { backgroundColor: string, color: string }> = {
		INFO: {
			backgroundColor: customStyles.colors.primary[200],
			color: customStyles.colors.neutral[600]
		},
		SUCCESS: {
			backgroundColor: customStyles.colors.success[100],
			color: customStyles.colors.neutral[600]
		},
		ERROR: {
			backgroundColor: customStyles.colors.error[500],
			color: customStyles.colors.neutral[50]
		}
	}

	const tagStyle = tagTypeToTagStyle[type]

	return (
		<div className="h-6 flex items-center px-2 rounded-sm gap-1" style={{ background: tagStyle.backgroundColor, color: tagStyle.color }}>
			{icon ?? icon}
			<span className="text-xs font-bold">{name}</span>
		</div>
	)
}

export default Tag
