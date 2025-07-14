import Pages from "@/pages"
import Dashboard from "@/pages/Dashboard"
import SignIn from "@/pages/SignIn"
import useAuthStore from "@/stores/auth-state-store"
import React from "react"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"

interface AuthGuardProps {
	isPrivate: boolean
}

const AuthGuard: React.FC<AuthGuardProps> = (props) => {
	const { isPrivate } = props

	const {
		isAuthenticated
	} = useAuthStore()

	if (!isAuthenticated && isPrivate) {
		return <Navigate to="/sign-in" replace />
	}

	if (isAuthenticated && !isPrivate) {
		return <Navigate to="/dashboard" replace />
	}

	return <Outlet />
}

const AuthLayout = () => {
	return (
		<div className="flex w-full h-full">
			<div className="w-full h-full">
				<Outlet />
			</div>
		</div>
	)
}

const PrivateLayout = () => {
	const {
		loading
	} = useAuthStore()

	return (
		<div className="w-full h-full overflow-hidden">
			<Pages>
				{loading ? (
					<div
						className="w-full h-full flex items-center justify-center"
					>
						carregando...
					</div>
				) : (
					<div className="w-full h-full">
						<Outlet />
					</div>
				)}
			</Pages>
		</div>
	)
}

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AuthGuard isPrivate={false} />}>
					<Route element={<AuthLayout />}>
						<Route path="/" element={<SignIn />} />
						<Route path="/sign-in" element={<SignIn />} />
					</Route>
				</Route>

				<Route element={<AuthGuard isPrivate={true} />}>
					<Route element={<PrivateLayout />}>
						<Route path="/dashboard" element={<Dashboard />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
