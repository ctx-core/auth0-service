import jwt, { JwtPayload } from 'jsonwebtoken'
import type { jwt_token_decoded_I } from '@ctx-core/auth0'
import { be_, B } from '@ctx-core/object'
import { jwks_cert__b } from './jwks_cert__b.js'
const key = 'jwt_token_decoded_'
export const jwt_token_decoded__b:B<jwt_token_decoded__T> = be_(key, ctx=>{
	const jwks_cert_ = jwks_cert__b(ctx)
	return jwt_token_decoded_ as jwt_token_decoded__T
	async function jwt_token_decoded_(jwt_token:string):Promise<JwtPayload|string> {
		const jwks_cert = await jwks_cert_()
		const auth0_token_decoded = jwt.verify(jwt_token, jwks_cert)
		return auth0_token_decoded as jwt_token_decoded_I
	}
})
export type jwt_token_decoded__T = (jwt_token:string)=>Promise<jwt_token_decoded_I>
