import { auth0__user__validate, user_id_ } from '@ctx-core/auth0'
import { auth0__v2_user__fetch_get } from '@ctx-core/auth0-management'
import { import_meta_env_ } from '@ctx-core/env'
import { auth0__jwt_token__verify_strict } from '../auth0__jwt_token__verify_strict/index.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @param {string}authorization
 * @return {Promise<string>}
 * @private
 */
export async function auth0__jwt_email__verify(ctx, authorization) {
	const verified_jwt_token =
		await auth0__jwt_token__verify_strict(ctx, authorization)
	let { email } = verified_jwt_token
	if (!email) {
		const user_id = user_id_(verified_jwt_token)
		const AUTH0_DOMAIN = import_meta_env_().AUTH0_DOMAIN
		/** @type {import('@ctx-core/auth0').get_auth0_v2_user_params_T} */
		const get_auth0_v2_user_params = {
			AUTH0_DOMAIN,
			user_id
		}
		const [user] = await auth0__v2_user__fetch_get(ctx, get_auth0_v2_user_params)
		auth0__user__validate(user)
		email = user.email
	}
	return email
}
export {
	auth0__jwt_email__verify as verify_jwt_email,
}
