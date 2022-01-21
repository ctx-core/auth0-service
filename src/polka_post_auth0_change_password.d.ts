import type { Request } from 'polka'
import type { ServerResponse } from 'http'
export declare function polka_post_auth0_change_password(
	req:Request&{ body:polka_post_auth0_change_password_body_T }, res?:ServerResponse
):Promise<Response>
export interface polka_post_auth0_change_password_body_T {
	password:string
}
