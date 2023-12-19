import type { auth0__access_token_o_T } from '@ctx-core/auth0'
import type { Ctx } from 'ctx-core/be'
export declare function auth0__header__authorization__access_token_o__validate(
	ctx:Ctx,
	authorization:string|undefined
):Promise<auth0__access_token_o_T>
export {
	auth0__header__authorization__access_token_o__validate as strict_verify_jwt_token,
	auth0__header__authorization__access_token_o__validate as koa_jwt_token_decoded_,
}
