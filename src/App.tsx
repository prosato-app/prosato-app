import AppRoutes from "@/routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false
		}
	}
})

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AppRoutes />
			<Toaster />
		</QueryClientProvider>
	)
}

export default App
