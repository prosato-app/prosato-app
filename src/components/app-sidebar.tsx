import * as React from "react"
import {
	Bot,
	Settings2
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarRail
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
	user: {
		name: "Antonio",
		email: "antonio@gmail.com",
		avatar: "/avatars/shadcn.jpg"
	},
	navMain: [
		{
			title: "Propostas",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Listagem",
					url: "#"
				}
			]
		},
		{
			title: "Configurações",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "Segurança",
					url: "#"
				},
				{
					title: "Perfil",
					url: "#"
				}
			]
		}
	]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
