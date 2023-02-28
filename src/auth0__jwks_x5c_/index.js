import { jwks__json__fetch_get } from '@ctx-core/auth0'
import { fetch_response__throw } from '@ctx-core/fetch-undici'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @return {Promise<string>}
 * @private
 */
export async function auth0__jwks_x5c_(ctx) {
	const [jwks_json, response] = await jwks__json__fetch_get(ctx)
	if (!response.ok) {
		await fetch_response__throw(response)
	}
	return jwks_json.keys[0].x5c
}
export {
	auth0__jwks_x5c_ as jwks_x5c_,
}
