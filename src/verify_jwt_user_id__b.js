import { user_id_ } from '@ctx-core/auth0'
import { be_ } from '@ctx-core/object'
import { koa_jwt_token_decoded__b} from './koa_jwt_token_decoded__b.js'
const key = 'verify_jwt_user_id_'
export const verify_jwt_user_id__b = be_(key, ctx=>{
	const koa_jwt_token_decoded_ = koa_jwt_token_decoded__b(ctx)
	return verify_jwt_user_id_
	/**
	 * @param {string} authorization
	 * @returns {Promise<string>}
	 * @private
	 */
	async function verify_jwt_user_id_(authorization) {
		const jwt_token_decoded = await koa_jwt_token_decoded_(authorization)
		/** @type {string} */
		const user_id = user_id_(jwt_token_decoded)
		return user_id
	}
})
