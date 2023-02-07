import jwt from 'jsonwebtoken'
import { auth0__jwks_cert_ } from '../auth0__jwks_cert_/index.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @param {string}jwt_token
 * @return {Promise<import('@ctx-core/auth0').auth0__verified__jwt_token_T|string>}
 * @private
 */
export async function auth0__jwt_token__verify(ctx, jwt_token) {
	const jwks_cert = await auth0__jwks_cert_(ctx)
	return jwt.verify(jwt_token, jwks_cert)
}
export {
	auth0__jwt_token__verify as verify_jwt_token,
	auth0__jwt_token__verify as jwt_token_decoded_, 
}
