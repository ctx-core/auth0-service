import { throw_bad_credentials } from '@ctx-core/error'
import { header_authorization_jwt_token_ } from '@ctx-core/jwt'
import { jwt_token_decoded_ } from './jwt_token_decoded_.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @param {string|undefined}authorization
 * @return {Promise<import('@ctx-core/auth0').jwt_token_decoded_I>}
 * @private
 */
export async function koa_jwt_token_decoded_(ctx, authorization) {
	const jwt_token = header_authorization_jwt_token_(authorization)
	if (!jwt_token) {
		throw_bad_credentials({})
	}
	return await jwt_token_decoded_(ctx, jwt_token)
}
