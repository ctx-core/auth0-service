import { get_jwks_json_b } from '@ctx-core/auth0'
import { throw_fetch_response } from '@ctx-core/fetch'
import { be_, B } from '@ctx-core/object'
import type { auth0_service_Ctx } from './auth0_service_Ctx.js'
const key = 'jwks_x5c_'
export const jwks_x5c__b:B<auth0_service_Ctx, typeof key> = be_(key, ctx=>{
	const get_jwks_json = get_jwks_json_b(ctx)
	return jwks_x5c_ as jwks_x5c__T
	async function jwks_x5c_() {
		const response = await get_jwks_json()
		if (!response.ok) {
			await throw_fetch_response(response)
		}
		const jwks_json = await response.json()
		const { keys } = jwks_json
		const key = keys[0]
		const { x5c } = key
		return x5c
	}
})
export type jwks_x5c__T = ()=>Promise<string>
