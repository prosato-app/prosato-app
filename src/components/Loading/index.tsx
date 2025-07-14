import type { PropsWithChildren } from "react"

type LoadingProps = PropsWithChildren<{
	isLoading: boolean
}>

const Loading = (props: LoadingProps) => {
	const { children, isLoading } = props

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-full">
				<div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
			</div>
		)
	}

	return <>{children}</>
}

export default Loading
