import { ProsatoLogoIcon } from "@/assets/icons"
import Avatar from "@/components/Avatar"
import IconButton from "@/components/IconButton"
import ListItemMenu from "@/components/SidebarMenu/ListItemMenu"
import useAuthStore from "@/stores/auth-state-store"
import customStyles from "@/styles/customStyles"
import { NotepadText as ProposalIcon, Bot as IAIcon, LogOut as LogOutIcon } from "lucide-react"
import { useState } from "react"



const SidebarMenu = () => {
	const [selectedOptionMenu, setSelectedOptionMenu] = useState<"proposal" | "IA">("proposal")

	const { signOut } = useAuthStore()

	return (
		<div className="flex flex-col w-52">
			<div className="flex flex-1/12 items-center justify-start px-4 py-4" style={{ border: `1px solid ${customStyles.colors.neutral[400]}` }}>
				<ProsatoLogoIcon className="w-12 h-12" style={{ fill: customStyles.colors.primary[500] }} />
				<span className="text-4xl" style={{ color: customStyles.colors.primary[500] }}>rosato</span>
			</div>
			<div className="flex flex-10/12 items-center justify-start" style={{ border: `1px solid ${customStyles.colors.neutral[400]}` }}>
				<ul className="flex flex-col h-full w-full">
					<ListItemMenu
						icon={<ProposalIcon className="w-8 h-8" style={{ color: customStyles.colors.neutral[700] }} />}
						name="Propostas"
						isSelected={selectedOptionMenu === "proposal"}
						isSoon={false}
						endpoint="/proposals"
						onClick={() => setSelectedOptionMenu("proposal")}
					/>
					<ListItemMenu
						icon={<IAIcon className="w-8 h-8" style={{ color: customStyles.colors.neutral[700] }} />}
						name="IA"
						isSelected={selectedOptionMenu === "IA"}
						isSoon
						endpoint="/ia"
						onClick={() => setSelectedOptionMenu("IA")}
					/>
				</ul>
			</div>
			<div className="flex flex-1/12 items-center justify-between px-4 py-4" style={{ border: `1px solid ${customStyles.colors.neutral[400]}` }}>
				<div className="flex items-center justify-between gap-2">
					<Avatar name="Antonio Wellington" />
					<span>Antonio</span>
				</div>
				<IconButton
					onClick={signOut}
				>
					<LogOutIcon className="hover:cursor-pointer" style={{ color: customStyles.colors.error[500] }} />
				</IconButton>
			</div>
		</div>
	)
}

export default SidebarMenu
