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
	const koajwt_token_decoded_fn = await strict_verify_jwt_token(ctx, authorization)
	let email = koajwt_token_decoded_fn.email
	if (!email) {
		const user_id = user_id_(koajwt_token_decoded_fn)
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
