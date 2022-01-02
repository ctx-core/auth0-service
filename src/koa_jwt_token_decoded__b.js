import { throw_bad_credentials } from '@ctx-core/error'
import { header_authorization_jwt_token_ } from '@ctx-core/jwt'
import { be_ } from '@ctx-core/object'
import { jwt_token_decoded__b } from './jwt_token_decoded__b.js'
const key = 'koa_jwt_token_decoded_'
export const koa_jwt_token_decoded__b = be_(key, ctx => {
	const jwt_token_decoded_ = jwt_token_decoded__b(ctx)
	return async function koa_jwt_token_decoded_(authorization) {
		const jwt_token = header_authorization_jwt_token_(authorization)
		if (!jwt_token) {
			throw_bad_credentials({})
		}
		return await jwt_token_decoded_(jwt_token)
	}
})
