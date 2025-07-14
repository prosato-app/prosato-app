import { AppSidebar } from "@/components/app-sidebar"
import {
	SidebarInset,
	SidebarProvider
} from "@/components/ui/sidebar"
import type { PropsWithChildren } from "react"

const Pages = (props: PropsWithChildren) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				{props.children}
			</SidebarInset>
		</SidebarProvider>
	)

}

export default Pages
