class CustomStyles {
	colors = {
		primary: {
			50: "#F2F5FF",
			100: "#E0E7FE",
			200: "#B8C6FC",
			300: "#8DA6FB",
			400: "#5C7EFA",
			500: "#3452FB",
			600: "#2B45D1",
			700: "#2236A6",
			800: "#1A297C",
			900: "#131D52"
		},
		warning: {
			100: "#FEF7C3",
			500: "#F79009",
			700: "#B54708"
		},
		success: {
			100: "#D1FADF",
			500: "#12B76A",
			700: "#027A48"
		},
		error: {
			100: "#FEE4E2",
			500: "#F04438	",
			700: "#B42318"
		},
		info: {
			100: "#D1E9FF",
			500: "#2E90FA",
			700: "#175CD3"
		},
		neutral: {
			50: "#FAFAFA",
			100: "#F4F4F5",
			200: "#E4E4E7",
			300: "#D4D4D8",
			400: "#A1A1AA",
			500: "#71717A",
			600: "#52525B",
			700: "#3F3F46",
			800: "#27272A",
			900: "#18181B"
		}
	} as const
	fontSize = {}
	fontWeight = {
		light: "300",
		regular: "400",
		medium: "500",
		semibold: "600",
		bold: "700"
	}
	padding = {
		0: "0rem",
		1: "1rem",
		2: "2rem",
		3: "3rem",
		4: "4rem",
		5: "5rem",
		6: "6rem"
	}

	getPrimary() {
		return this.colors.primary[500]
	}
}

export default new CustomStyles()
