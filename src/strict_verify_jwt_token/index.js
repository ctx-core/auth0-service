import { throw_bad_credentials } from '@ctx-core/error'
import { header_authorization_jwt_token_ } from '@ctx-core/jwt'
import { verify_jwt_token } from '../verify_jwt_token/index.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @param {string|undefined}authorization
 * @return {Promise<import('@ctx-core/auth0').verified_jwt_token_I>}
 * @private
 */
export async function strict_verify_jwt_token(ctx, authorization) {
	const jwt_token = header_authorization_jwt_token_(authorization)
	if (!jwt_token) {
		throw_bad_credentials()
	}
	return await verify_jwt_token(ctx, jwt_token)
}
export { strict_verify_jwt_token as koa_jwt_token_decoded_ }
