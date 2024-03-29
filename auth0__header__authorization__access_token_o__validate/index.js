/// <reference types="@ctx-core/auth0" />
/// <reference types="ctx-core" />
import { bad_credentials__throw } from 'ctx-core/error'
import { authorization__header__jwt_token_ } from '@ctx-core/jwt'
import { auth0__access_token_o__new } from '../auth0__access_token_o__new/index.js'
/**
 * @param {ctx_T}ctx
 * @param {string|undefined}authorization
 * @return {Promise<auth0__access_token_o_T>}
 * @private
 */
export async function auth0__header__authorization__access_token_o__validate(
	ctx,
	authorization
) {
	const jwt_token = authorization__header__jwt_token_(authorization)
	if (!jwt_token) {
		bad_credentials__throw()
	}
	return await auth0__access_token_o__new(ctx, jwt_token)
}
export {
	auth0__header__authorization__access_token_o__validate as strict_verify_jwt_token,
	auth0__header__authorization__access_token_o__validate as koa_jwt_token_decoded_,
}
