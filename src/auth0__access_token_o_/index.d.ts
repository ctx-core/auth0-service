import type { auth0__access_token_o_T } from '@ctx-core/auth0'
import type { Ctx } from '@ctx-core/object'
export declare function auth0__access_token_o_(
	ctx:Ctx, jwt_token:string
):Promise<auth0__access_token_o_T>
export {
	auth0__access_token_o_ as auth0__jwt_token__verify,
	auth0__access_token_o_ as verify_jwt_token,
	auth0__access_token_o_ as jwt_token_decoded_,
}
