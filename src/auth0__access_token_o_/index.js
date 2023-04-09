import jwt from 'jsonwebtoken'
import { auth0__jwks_cert_ } from '../auth0__jwks_cert_/index.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @param {string}access_token
 * @return {Promise<import('@ctx-core/auth0').auth0__access_token_o_T|string>}
 * @private
 */
export async function auth0__access_token_o_(
	ctx,
	access_token
) {
	const jwks_cert = await auth0__jwks_cert_(ctx)
	return jwt.verify(access_token, jwks_cert)
}
export {
	auth0__access_token_o_ as auth0__jwt_token__verify,
	auth0__access_token_o_ as verify_jwt_token,
	auth0__access_token_o_ as jwt_token_decoded_,
}
