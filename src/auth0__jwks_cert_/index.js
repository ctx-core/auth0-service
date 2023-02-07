import { auth0__jwks_x5c_ } from '../auth0__jwks_x5c_/index.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @return {Promise<string>}
 * @private
 */
export async function auth0__jwks_cert_(ctx) {
	const jwks_x5c = await auth0__jwks_x5c_(ctx)
	const injwks_cert_fn = jwks_x5c[0]
	const jwks_cert =
		['-----BEGIN CERTIFICATE-----',
			injwks_cert_fn,
			'-----END CERTIFICATE-----'
		].join('\n')
	return jwks_cert
}
export {
	auth0__jwks_cert_ as jwks_cert_,
}
