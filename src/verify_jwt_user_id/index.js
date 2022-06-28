import { user_id_ } from '@ctx-core/auth0'
import { strict_verify_jwt_token } from '../strict_verify_jwt_token/index.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @param {string}authorization
 * @returns {Promise<string>}
 * @private
 */
export async function verify_jwt_user_id(ctx, authorization) {
	const verified_jwt_token = await strict_verify_jwt_token(ctx, authorization)
	return user_id_(verified_jwt_token)
}
