import type { PropsWithChildren } from "react"

type SectionBlockType = PropsWithChildren

const SectionBlock = (props: SectionBlockType) => {
	const {
		children
	} = props

	return (
		<div className="w-full">
			{children}
		</div>
	)
}

export default SectionBlock
