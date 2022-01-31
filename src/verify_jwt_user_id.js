import { user_id_ } from '@ctx-core/auth0'
import { koa_jwt_token_decoded_ } from './koa_jwt_token_decoded_.js'
/**
 * @param {import('@ctx-core/object').Ctx}ctx
 * @param {string}authorization
 * @returns {Promise<string>}
 * @private
 */
export async function verify_jwt_user_id(ctx, authorization) {
	const jwt_token_decoded = await koa_jwt_token_decoded_(ctx, authorization)
	return user_id_(jwt_token_decoded)
}
