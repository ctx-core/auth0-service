import jwt from 'jsonwebtoken'
import { jwks_cert_ } from './jwks_cert_.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @param {string}jwt_token
 * @return {Promise<import('@ctx-core/auth0').jwt_token_decoded_I|string>}
 * @private
 */
export async function jwt_token_decoded_(ctx, jwt_token) {
	const jwks_cert = await jwks_cert_(ctx)
	return jwt.verify(jwt_token, jwks_cert)
}
