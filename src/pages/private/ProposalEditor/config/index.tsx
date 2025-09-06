import { Text } from "@/pages/private/ProposalEditor/config/blocks/Text"
import { Grid } from "@/pages/private/ProposalEditor/config/blocks/Grid"
import { Header } from "@/pages/private/ProposalEditor/config/blocks/Header"
import { HeroSection } from "@/pages/private/ProposalEditor/config/blocks/HeroSection"
import { CompanyPresentation } from "@/pages/private/ProposalEditor/config/blocks/CompanyPresentation"
import { Container } from "@/pages/private/ProposalEditor/config/blocks/Container"
import { Divider } from "@/pages/private/ProposalEditor/config/blocks/Divider"
import { Spacing } from "@/pages/private/ProposalEditor/config/blocks/Spacing"
import { ServiceDescription } from "@/pages/private/ProposalEditor/config/blocks/ServiceDescription"
import { PackagesPrices } from "@/pages/private/ProposalEditor/config/blocks/PackagesPrices"
import { CallToAction } from "@/pages/private/ProposalEditor/config/blocks/CallToAction"
import { Testimonials } from "@/pages/private/ProposalEditor/config/blocks/Testimonials"
import { Root, type RootProps } from "@/pages/private/ProposalEditor/config/root"
import type { Components } from "@/pages/private/ProposalEditor/config/types"
import type { Config, Data } from "@measured/puck"

export const puckConfig: Config<Components, RootProps> = {
	root: Root,
	components: {
		Text: Text,
		Grid: Grid,
		Header: Header,
		HeroSection: HeroSection,
		CompanyPresentation: CompanyPresentation,
		Container: Container,
		Divider: Divider,
		Spacing: Spacing,
		ServiceDescription: ServiceDescription,
		PackagesPrices: PackagesPrices,
		CallToAction: CallToAction,
		Testimonials: Testimonials
	},
	categories: {
		identidade: {
			components: ["Header", "HeroSection", "CompanyPresentation"],
			title: "Identidade & Apresentação"
		},
		estrutura: {
			components: ["Container", "Divider", "Spacing", "Grid"],
			title: "Estrutura & Layout"
		},
		oferta: {
			components: ["ServiceDescription", "PackagesPrices"],
			title: "Oferta & Serviços"
		},
		provasocial: {
			components: ["Testimonials"],
			title: "Prova Social & Credibilidade"
		},
		conversao: {
			components: ["CallToAction"],
			title: "Conversão & Fechamento"
		},
		conteudo: {
			components: ["Text"],
			title: "Conteúdo"
		}
	}
}

export type UserData = Data<Components, RootProps>

export default puckConfig
