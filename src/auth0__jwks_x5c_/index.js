import { jwks__json__fetch_get } from '@ctx-core/auth0'
import { throw_fetch_response } from '@ctx-core/fetch-undici'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @return {Promise<string>}
 * @private
 */
export async function auth0__jwks_x5c_(ctx) {
	const [jwks_json, response] = await jwks__json__fetch_get(ctx)
	if (!response.ok) {
		await throw_fetch_response(response)
	}
	return jwks_json.keys[0].x5c
}
export {
	auth0__jwks_x5c_ as jwks_x5c_,
}
