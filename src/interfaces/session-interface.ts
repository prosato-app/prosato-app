export interface ISigninInput {
	email: string
	password: string
}

export interface ISigninOutput {
	accessToken: string
}

export interface IRenewAccessTokenOutput {
	accessToken: string
}
