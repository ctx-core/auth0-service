import { user_id_ } from '@ctx-core/auth0'
import { auth0__jwt_token__verify_strict } from '../auth0__jwt_token__verify_strict/index.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @param {string}authorization
 * @returns {Promise<string>}
 * @private
 */
export async function auth0__jwt_user_id__verify(ctx, authorization) {
	const verified_jwt_token = await auth0__jwt_token__verify_strict(ctx, authorization)
	return user_id_(verified_jwt_token)
}
export {
	auth0__jwt_user_id__verify as verify_jwt_user_id,
}
