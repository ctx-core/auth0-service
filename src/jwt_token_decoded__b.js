import jwt from 'jsonwebtoken'
import { be_ } from '@ctx-core/object'
import { jwks_cert__b } from './jwks_cert__b.js'
const key = 'jwt_token_decoded_'
export const jwt_token_decoded__b = be_(key, ctx=>{
	const jwks_cert_ = jwks_cert__b(ctx)
	return jwt_token_decoded_
	async function jwt_token_decoded_(jwt_token) {
		const jwks_cert = await jwks_cert_()
		const auth0_token_decoded = jwt.verify(jwt_token, jwks_cert)
		return auth0_token_decoded
	}
})
