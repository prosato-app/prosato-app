import SectionBlock from "@/pages/private/Proposals/editor/blocks/section-block"
import { Puck, type Config, type Data } from "@measured/puck"
import "@measured/puck/puck.css"

// Create Puck component config
const config: Config = {
	components: {
		HeadingBlock: {
			fields: {
				children: {
					type: "text"
				}
			},
			render: ({ children }) => {
				return <h1>{children}</h1>
			}
		},
		SectionBlock: {
			fields: {
				content: {
					type: "slot"
				}
			},
			render: ({ content: Content }) => {
				return <SectionBlock><Content /></SectionBlock>
			}
		}
	}
}

// Describe the initial data
const initialData = {}

// Save the data to your database
const save = (data: Data) => {
	console.log(data.content)
}

// Render Puck editor
export function Editor() {
	return <Puck config={config} data={initialData} onPublish={save} />
}
