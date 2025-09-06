import Pages from "@/pages/private"
import Home from "@/pages/private/Home"
import { ProposalEditor } from "@/pages/private/ProposalEditor"
import Proposals from "@/pages/private/Proposals"
import SignIn from "@/pages/public/SignIn"
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

	// Protect private routes - redirect to sign-in if not authenticated
	if (!isAuthenticated && isPrivate) {
		return <Navigate to="/sign-in" replace />
	}

	// Redirect authenticated users away from auth pages
	if (isAuthenticated && !isPrivate) {
		return <Navigate to="/proposals" replace />
	}

	return <Outlet />
}

const AuthLayout = () => {
	return (
		<div className="flex w-full h-full">
			<div className="flex w-full h-full">
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
					<div className="flex flex-1 h-full">
						<Outlet />
					</div>
				)}
			</Pages>
		</div>
	)
}

const EditorLayout = () => {
	const {
		loading
	} = useAuthStore()

	return (
		<div className="w-full h-full overflow-hidden">
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
						<Route path="/proposals" element={<Proposals />} />
						<Route path="/ia" element={<Home />} />
					</Route>
					<Route element={<EditorLayout />}>
						<Route path="/proposal-editor" element={<ProposalEditor />} />
						<Route path="/proposal-editor/:id" element={<ProposalEditor />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
