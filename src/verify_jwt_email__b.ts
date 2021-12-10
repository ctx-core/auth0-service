import { user_id_, validate_auth0_user } from '@ctx-core/auth0'
import { get_auth0_v2_user_b, get_auth0_v2_user_params_T } from '@ctx-core/auth0-management'
import { be_, B } from '@ctx-core/object'
import { koa_jwt_token_decoded__b} from './koa_jwt_token_decoded__b.js'
const key = 'verify_jwt_email_'
export const verify_jwt_email__b:B<verify_jwt_email__T> = be_(key, ctx=>{
	const koa_jwt_token_decoded_ = koa_jwt_token_decoded__b(ctx)
	return verify_jwt_email_ as verify_jwt_email__T
	async function verify_jwt_email_(authorization:string) {
		const koajwt_token_decoded_fn = await koa_jwt_token_decoded_(authorization)
		let email = koajwt_token_decoded_fn.email
		if (!email) {
			const user_id = user_id_(koajwt_token_decoded_fn)
			const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN as string
			const get_auth0_v2_user_params = {
				AUTH0_DOMAIN,
				user_id
			} as get_auth0_v2_user_params_T
			const response = await get_auth0_v2_user_b(ctx)(get_auth0_v2_user_params)
			const user = await response.json()
			validate_auth0_user(user)
			email = user.email
		}
		return email
	}
})
export type verify_jwt_email__T = (authorization:string)=>Promise<string>
