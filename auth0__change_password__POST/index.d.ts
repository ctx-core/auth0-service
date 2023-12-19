import type { Ctx } from 'ctx-core/be'
export declare function auth0__change_password__POST(
	ctx:Ctx,
	req:Request
):Promise<Response>
export {
	auth0__change_password__POST as POST_auth0_change_password,
}
export interface auth0__change_password__POST__body_T {
	password:string
}
export declare type POST_auth0_change_password_body_T = auth0__change_password__POST__body_T
