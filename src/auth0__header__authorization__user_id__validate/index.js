import { auth0__user_id_ } from '@ctx-core/auth0'
import { auth0__header__authorization__access_token_o__validate } from '../auth0__header__authorization__access_token_o__validate/index.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @param {string}authorization
 * @returns {Promise<string>}
 * @private
 */
export async function auth0__header__authorization__user_id__validate(ctx, authorization) {
	const verified_jwt_token = await auth0__header__authorization__access_token_o__validate(ctx, authorization)
	return auth0__user_id_(verified_jwt_token)
}
export {
	auth0__header__authorization__user_id__validate as auth0__jwt_auth0__user_id__verify,
	auth0__header__authorization__user_id__validate as verify_jwt_user_id,
}
