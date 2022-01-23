import { get_jwks_json_b } from '@ctx-core/auth0'
import { throw_fetch_response } from '@ctx-core/fetch-undici'
import { be_ } from '@ctx-core/object'
const key = 'jwks_x5c_'
/** @type {import('./jwks_x5c__b.d.ts').jwks_x5c__b} */
export const jwks_x5c__b = be_(key, ctx=>{
	return jwks_x5c_
	async function jwks_x5c_() {
		const [jwks_json, response] = await get_jwks_json_b(ctx)()
		if (!response.ok) {
			await throw_fetch_response(response)
		}
		const { keys } = jwks_json
		const key = keys[0]
		const { x5c } = key
		return x5c
	}
})
