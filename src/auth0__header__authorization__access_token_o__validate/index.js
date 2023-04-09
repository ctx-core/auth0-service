import { bad_credentials__throw } from '@ctx-core/error'
import { authorization__header__jwt_token_ } from '@ctx-core/jwt'
import { auth0__access_token_o_ } from '../auth0__access_token_o_/index.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @param {string|undefined}authorization
 * @return {Promise<import('@ctx-core/auth0').auth0__access_token_o_T>}
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
	return await auth0__access_token_o_(ctx, jwt_token)
}
export {
	auth0__header__authorization__access_token_o__validate as strict_verify_jwt_token,
	auth0__header__authorization__access_token_o__validate as koa_jwt_token_decoded_,
}
