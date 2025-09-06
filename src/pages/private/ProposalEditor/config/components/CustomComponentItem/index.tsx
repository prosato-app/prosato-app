import {
	Type, Grid3X3, Heading1, Star, Building2,
	Container as ContainerIcon, Minus, Space, Package, DollarSign,
	MousePointer, MessageSquare
} from "lucide-react"

const iconMap = {
	Text: Type,
	Grid: Grid3X3,
	Header: Heading1,
	HeroSection: Star,
	CompanyPresentation: Building2,
	Container: ContainerIcon,
	Divider: Minus,
	Spacing: Space,
	ServiceDescription: Package,
	PackagesPrices: DollarSign,
	CallToAction: MousePointer,
	Testimonials: MessageSquare
}

const labelMap = {
	Text: "Texto",
	Grid: "Grade",
	Header: "Cabeçalho",
	HeroSection: "Seção Hero",
	CompanyPresentation: "Apresentação da Empresa",
	Container: "Container",
	Divider: "Divisor",
	Spacing: "Espaçamento",
	ServiceDescription: "Descrição de Serviços",
	PackagesPrices: "Pacotes & Preços",
	CallToAction: "Call-to-Action",
	Testimonials: "Depoimentos"
}

type CustomComponentItemProps = {
	name: string
}

const CustomComponentItem = (props: CustomComponentItemProps) => {
	const {
		name
	} = props

	const IconComponent = iconMap[name as keyof typeof iconMap] || Type
	const label = labelMap[name as keyof typeof labelMap] || name

	return (
		<div className="group flex flex-col items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm cursor-grab hover:shadow-md hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 active:scale-95 mb-2"
		>
			<div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
				<IconComponent className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
			</div>
			<span className="text-sm font-medium text-gray-800 group-hover:text-blue-800 transition-colors">
				{label}
			</span>
		</div>
	)
}

export default CustomComponentItem
