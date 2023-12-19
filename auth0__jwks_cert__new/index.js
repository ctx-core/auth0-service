/// <reference types="ctx-core" />
import { auth0__jwks_x5c__new } from '../auth0__jwks_x5c__new/index.js'
/**
 * @param {Ctx}ctx
 * @return {Promise<string>}
 * @private
 */
export async function auth0__jwks_cert__new(ctx) {
	const jwks_x5c = await auth0__jwks_x5c__new(ctx)
	const injwks_cert_fn = jwks_x5c[0]
	const jwks_cert =
		['-----BEGIN CERTIFICATE-----',
			injwks_cert_fn,
			'-----END CERTIFICATE-----'
		].join('\n')
	return jwks_cert
}
export {
	auth0__jwks_cert__new as auth0__jwks_cert_,
	auth0__jwks_cert__new as jwks_cert_,
}
