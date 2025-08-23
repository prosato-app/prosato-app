import customStyles from "@/styles/customStyles"

type AvatarProps = {
	name: string
}

const Avatar = (props: AvatarProps) => {
	const {
		name
	} = props

	const [firstName, lastName] = name.split(" ")

	return (
		<div
			className="flex items-center justify-center w-10 h-10 rounded-4xl"
			style={{
				backgroundColor: customStyles.colors.neutral[300]
			}}
		>
			<span className="font-bold">{`${firstName?.charAt(0)}${lastName?.charAt(0)}`}</span>
		</div>
	)
}

export default Avatar
