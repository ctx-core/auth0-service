import { get_jwks_json } from '@ctx-core/auth0'
import { throw_fetch_response } from '@ctx-core/fetch-undici'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @return {Promise<string>}
 * @private
 */
export async function jwks_x5c_(ctx) {
	const [jwks_json, response] = await get_jwks_json(ctx)
	if (!response.ok) {
		await throw_fetch_response(response)
	}
	const { keys } = jwks_json
	const key = keys[0]
	const { x5c } = key
	return x5c
}
