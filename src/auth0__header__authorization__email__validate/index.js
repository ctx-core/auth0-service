import { auth0__user__validate, auth0__user_id_, AUTH0_DOMAIN_ } from '@ctx-core/auth0'
import { auth0__v2_user__fetch_get } from '@ctx-core/auth0-management'
import {
	auth0__header__authorization__access_token_o__validate
} from '../auth0__header__authorization__access_token_o__validate/index.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @param {string}authorization
 * @return {Promise<string>}
 * @private
 */
export async function auth0__header__authorization__email__validate(
	ctx,
	authorization
) {
	const auth0__access_token_o =
		await auth0__header__authorization__access_token_o__validate(ctx, authorization)
	let { email } = auth0__access_token_o
	if (!email) {
		const user_id = auth0__user_id_(auth0__access_token_o)
		/** @type {import('@ctx-core/auth0').auth0__v2_user__fetch_get__params_T} */
		const get_auth0_v2_user_params = {
			AUTH0_DOMAIN: AUTH0_DOMAIN_(ctx),
			user_id
		}
		const [user] = await auth0__v2_user__fetch_get(ctx, get_auth0_v2_user_params)
		auth0__user__validate(user)
		email = user.email
	}
	return email
}
export {
	auth0__header__authorization__email__validate as auth0__jwt_email__verify,
	auth0__header__authorization__email__validate as verify_jwt_email,
}
