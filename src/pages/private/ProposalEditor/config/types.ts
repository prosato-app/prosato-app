import type { TextProps } from "@/pages/private/ProposalEditor/config/blocks/Text"
import type { GridProps } from "@/pages/private/ProposalEditor/config/blocks/Grid"
import type { HeaderProps } from "@/pages/private/ProposalEditor/config/blocks/Header"
import type { HeroSectionProps } from "@/pages/private/ProposalEditor/config/blocks/HeroSection"
import type { CompanyPresentationProps } from "@/pages/private/ProposalEditor/config/blocks/CompanyPresentation"
import type { ContainerProps } from "@/pages/private/ProposalEditor/config/blocks/Container"
import type { DividerProps } from "@/pages/private/ProposalEditor/config/blocks/Divider"
import type { SpacingProps } from "@/pages/private/ProposalEditor/config/blocks/Spacing"
import type { ServiceDescriptionProps } from "@/pages/private/ProposalEditor/config/blocks/ServiceDescription"
import type { PackagesPricesProps } from "@/pages/private/ProposalEditor/config/blocks/PackagesPrices"
import type { CallToActionProps } from "@/pages/private/ProposalEditor/config/blocks/CallToAction"
import type { TestimonialsProps } from "@/pages/private/ProposalEditor/config/blocks/Testimonials"
import type { RootProps } from "@/pages/private/ProposalEditor/config/root"
import type { Data } from "@measured/puck"

export type CategorieType =
	"identidade" |
	"estrutura" |
	"oferta" |
	"provasocial" |
	"planejamento" |
	"conversao" |
	"comunicacao" |
	"midia"


export type Components = {
	Text: TextProps
	Grid: GridProps
	Header: HeaderProps
	HeroSection: HeroSectionProps
	CompanyPresentation: CompanyPresentationProps
	Container: ContainerProps
	Divider: DividerProps
	Spacing: SpacingProps
	ServiceDescription: ServiceDescriptionProps
	PackagesPrices: PackagesPricesProps
	CallToAction: CallToActionProps
	Testimonials: TestimonialsProps
}

export type UserData = Data<Components, RootProps>

export interface EditorHandlers {
	onPublish?: (data: UserData) => void | Promise<void>
	onSave?: (data: UserData) => void | Promise<void>
}

export type ComponentKey = keyof Components
