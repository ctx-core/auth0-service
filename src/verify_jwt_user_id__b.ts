import { user_id_ } from '@ctx-core/auth0'
import { be_, B } from '@ctx-core/object'
import { koa_jwt_token_decoded__b} from './koa_jwt_token_decoded__b.js'
const key = 'verify_jwt_user_id_'
export const verify_jwt_user_id__b:B<verify_jwt_user_id__T> = be_(key, ctx=>{
	const koa_jwt_token_decoded_ = koa_jwt_token_decoded__b(ctx)
	return verify_jwt_user_id_ as verify_jwt_user_id__T
	async function verify_jwt_user_id_(authorization:string) {
		const jwt_token_decoded = await koa_jwt_token_decoded_(authorization)
		const user_id = user_id_(jwt_token_decoded)
		return user_id
	}
})
export type verify_jwt_user_id__T = (authorization:string)=>Promise<string>
