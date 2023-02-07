import { bad_credentials__throw } from '@ctx-core/error'
import { authorization__header__jwt_token_ } from '@ctx-core/jwt'
import { auth0__jwt_token__verify } from '../auth0__jwt_token__verify/index.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @param {string|undefined}authorization
 * @return {Promise<import('@ctx-core/auth0').auth0__verified__jwt_token_T>}
 * @private
 */
export async function auth0__jwt_token__verify_strict(
	ctx, authorization
) {
	const jwt_token = authorization__header__jwt_token_(authorization)
	if (!jwt_token) {
		bad_credentials__throw()
	}
	return await auth0__jwt_token__verify(ctx, jwt_token)
}
export {
	auth0__jwt_token__verify_strict as strict_verify_jwt_token,
	auth0__jwt_token__verify_strict as koa_jwt_token_decoded_,
}
