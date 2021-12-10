import { be_, B } from '@ctx-core/object'
import { jwks_x5c__b } from './jwks_x5c__b.js'
const key = 'jwks_cert_'
export const jwks_cert__b:B<jwks_cert__T> = be_(key, ctx=>{
	const jwks_x5c_ = jwks_x5c__b(ctx)
	return jwks_cert_ as jwks_cert__T
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
export type jwks_cert__T = ()=>Promise<string>
