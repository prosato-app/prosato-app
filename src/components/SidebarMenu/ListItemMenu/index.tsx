import Tag from "@/components/Tag"
import customStyles from "@/styles/customStyles"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"

type ListItemMenuProps = {
	icon: ReactNode
	name: string
	isSelected: boolean
	isSoon: boolean
	endpoint: string
	onClick?: () => void
}
const ListItemMenu = (props: ListItemMenuProps) => {
	const {
		icon,
		name,
		isSelected,
		isSoon,
		endpoint,
		onClick
	} = props

	return (
		<Link
			to={endpoint}
			onClick={onClick}
		>
			<li className={`flex items-center gap-2 hover:bg-blue-50 px-4 py-2 hover:cursor-pointer ${isSelected ? "border-l-4 border-l-blue-600" : "border-none"} `}>
				{icon}
				<span className="text-xl" style={{ color: customStyles.colors.neutral[600] }}>{name}</span>
				{isSoon && (
					<Tag
						type="INFO"
						name="Em breve"
					/>
				)}
			</li>
		</Link>
	)
}

export default ListItemMenu
