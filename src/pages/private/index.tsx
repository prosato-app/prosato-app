import SidebarMenu from "@/components/SidebarMenu"
import type { PropsWithChildren } from "react"

const Pages = (props: PropsWithChildren) => {
	return (
		<div className="flex h-full w-full">
			<SidebarMenu />
			<div className="flex w-[calc(100%-208px)] min-w-0">
				{props.children}
			</div>
		</div>
	)
}

export default Pages
