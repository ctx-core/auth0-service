import { user_id_, validate_auth0_user } from '@ctx-core/auth0'
import { get_auth0_v2_user } from '@ctx-core/auth0-management'
import { strict_verify_jwt_token } from './strict_verify_jwt_token.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @param {string}authorization
 * @return {Promise<string>}
 * @private
 */
export async function verify_jwt_email(ctx, authorization) {
	const verified_jwt_token = await strict_verify_jwt_token(ctx, authorization)
	let { email } = verified_jwt_token
	if (!email) {
		const user_id = user_id_(verified_jwt_token)
		const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
		/** @type {import('@ctx-core/auth0').get_auth0_v2_user_params_T} */
		const get_auth0_v2_user_params = {
			AUTH0_DOMAIN,
			user_id
		}
		const [user] = await get_auth0_v2_user(ctx, get_auth0_v2_user_params)
		validate_auth0_user(user)
		email = user.email
	}
	return email
}
