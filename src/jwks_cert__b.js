import { be_ } from '@ctx-core/object'
import { jwks_x5c__b } from './jwks_x5c__b.js'
const key = 'jwks_cert_'
/** @type {import('./jwks_cert__b.d.ts').jwks_cert__b} */
export const jwks_cert__b = be_(key, ctx=>{
	const jwks_x5c_ = jwks_x5c__b(ctx)
	return jwks_cert_
	async function jwks_cert_() {
		const jwks_x5c = await jwks_x5c_()
		const injwks_cert_fn = jwks_x5c[0]
		const jwks_cert =
			['-----BEGIN CERTIFICATE-----',
				injwks_cert_fn,
				'-----END CERTIFICATE-----'
			].join('\n')
		return jwks_cert
	}
})
