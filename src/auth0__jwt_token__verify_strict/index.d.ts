import type { auth0__verified__jwt_token_T } from '@ctx-core/auth0'
import type { Ctx } from '@ctx-core/object'
export declare function auth0__jwt_token__verify_strict(
	ctx:Ctx, authorization:string|undefined
):Promise<auth0__verified__jwt_token_T>
export {
	auth0__jwt_token__verify_strict as strict_verify_jwt_token,
	auth0__jwt_token__verify_strict as koa_jwt_token_decoded_,
}
