import jwt from 'jsonwebtoken'
import { jwks_cert_ } from '../jwks_cert_/index.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @param {string}jwt_token
 * @return {Promise<import('@ctx-core/auth0').verified_jwt_token_I|string>}
 * @private
 */
export async function verify_jwt_token(ctx, jwt_token) {
	const jwks_cert = await jwks_cert_(ctx)
	return jwt.verify(jwt_token, jwks_cert)
}
export { verify_jwt_token as jwt_token_decoded_ }
