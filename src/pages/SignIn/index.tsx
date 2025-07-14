import { ProsatoLogoIcon } from "@/assets/icons"
import useController from "@/pages/SignIn/useController"

import {
	Eye as ShowPasswordIcon,
	EyeOff as HidePasswordIcon
} from "lucide-react"

const SignIn = () => {
	const {
		errors,
		handleSubmit,
		register,
		isShowPassword,
		handleChangePasswordVisibility
	} = useController()

	return (
		<div className="w-screen h-screen flex items-center justify-center bg-[#e6ebff]">
			<form onSubmit={handleSubmit} className="bg-white pt-16 pr-12 pb-8 pl-12 rounded-lg shadow-lg w-96 h-11/12 flex justify-center items-center">
				<div className="w-full h-full justify-between items-center flex flex-col">
					<div className="flex flex-2/6 flex-col justify-around items-center">
						<div>
							<h2
								className="text-3xl font-bold text-center text-[#3552FB]"
							>
								BEM VINDO
							</h2>
						</div>

						<div className="flex justify-center">
							<div className="bg-[#3552FB] rounded-xl p-2">
								<ProsatoLogoIcon width={48} height={48} fill="#ffffff" />
							</div>
						</div>
					</div>
					<div className="w-full flex flex-3/6 flex-col justify-around">
						<div className="flex flex-col gap-10">
							<div className="relative w-full">
								<input
									type="email"
									id="email"
									placeholder=" "
									className="peer w-full pb-2 pl-2 border-b-2 border-[#adadad] focus:outline-none text-[#999999] focus:border-[#3552FB]"
									{...register("email")}
								/>
								<label
									htmlFor="email"
									className="absolute left-2 top-2 text-[#999999] text-sm transition-all duration-500
    peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#999999]
    peer-focus:top-[-24px] peer-focus:text-sm peer-focus:text-[#999999]
    peer-not-placeholder-shown:top-[-24px] peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-[#999999]"
								>
									Email
								</label>
								{errors.email && (
									<span className="text-red-600 text-sm mt-1 block">
										{errors.email.message}
									</span>
								)}
							</div>
							<div className="relative w-full">
								<input
									type={isShowPassword ? "text" : "password"}
									id="password"
									placeholder=" "
									className="peer w-full pb-2 pl-2 border-b-2 border-[#adadad] focus:outline-none text-[#999999] focus:border-[#3552FB]"
									{...register("password")}
								/>
								<label
									htmlFor="password"
									className="absolute left-2 top-2 text-[#999999] text-sm transition-all duration-500
    peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#999999]
    peer-focus:top-[-24px] peer-focus:text-sm peer-focus:text-[#999999]
    peer-not-placeholder-shown:top-[-24px] peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-[#999999]"
								>
									Senha
								</label>
								<div
									onClick={handleChangePasswordVisibility}
									className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#999999] cursor-pointer"
								>
									{isShowPassword ? <HidePasswordIcon width={16} height={16} /> : <ShowPasswordIcon width={16} height={16} />}
								</div>
								{errors.password && (
									<span className="text-red-600 text-sm mt-1 block">
										{errors.password.message}
									</span>
								)}
							</div>
						</div>
						<div className="w-full">
							<button
								type="submit"
								className="bg-[#3552FB] text-white py-3 rounded hover:bg-[#2a42c7] transition shadow-md w-full"
							>
								Entrar
							</button>
						</div>
					</div>
					<div className="flex flex-1/6 items-end">
						<p className="text-center text-[#5a6bbd]">
							Esqueceu a senha?{" "}
							<a href="#" className="text-[#3552FB] hover:underline">
								Clique aqui
							</a>
						</p>
					</div>
				</div>
			</form>
		</div>
	)
}

export default SignIn
