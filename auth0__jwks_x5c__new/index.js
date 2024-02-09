/// <reference types="ctx-core" />
import { jwks__json__GET__fetch2 } from '@ctx-core/auth0'
import { fetch_response__throw } from 'ctx-core/fetch'
/**
 * @param {ctx_T}ctx
 * @return {Promise<string>}
 * @private
 */
export async function auth0__jwks_x5c__new(ctx) {
	const [
		jwks_json,
		response
	] = await jwks__json__GET__fetch2(ctx)
	if (!response.ok) {
		await fetch_response__throw(response)
	}
	return jwks_json.keys[0].x5c
}
export {
	auth0__jwks_x5c__new as jwks_x5c_,
}
