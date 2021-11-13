import type { Auth0UserProfile } from 'auth0-js'
import type { ServerResponse } from 'http'
import type { Request } from 'polka'
import { user_id_ } from '@ctx-core/auth0'
import {
	auth0_management_Ctx, get_auth0_v2_user_b, get_auth0_v2_users_by_email_b, get_auth0_v2_users_by_email_response_T,
	patch_auth0_v2_user_b
} from '@ctx-core/auth0-management'
import { header_authorization_jwt_token_ } from '@ctx-core/jwt'
import { log } from '@ctx-core/logger'
import type { auth0_service_Ctx } from './auth0_service_Ctx.js'
import { jwt_token_decoded__b } from './jwt_token_decoded__b.js'
const logPrefix = '@ctx-core/auth0-service/node/polka_post_auth0_change_password.ts'
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN!
if (!AUTH0_DOMAIN) throw `AUTH0_DOMAIN env variable not defined`
export async function polka_post_auth0_change_password(
	req:Request&{ body:polka_post_auth0_change_password_body_T }, res:ServerResponse
) {
	log(`${logPrefix}|polka_post_auth0_change_password`)
	const ctx = {} as polka_post_auth0_change_password_Ctx
	const authorization_header = req.headers['authorization']
	const jwt_token = header_authorization_jwt_token_(authorization_header)
	if (!jwt_token) {
		res.statusCode = 401
		res.end('Unauthorized')
		return
	}
	const jwt_token_decoded_ = jwt_token_decoded__b(ctx)
	const patch_auth0_v2_user = patch_auth0_v2_user_b(ctx)
	const password_user = await password_user_()
	const { user_id } = password_user
	if (!password_user) {
		res.statusCode = 401
		res.end('Unauthorized')
		return
	}
	const { body } = req
	const { password } = body
	const response = await patch_auth0_v2_user(user_id, { password })
	const user = await response.json()
	if (user.error) {
		console.trace(`patch_auth0_v2_user error response: ${response.status}:\n${user}`)
		res.statusCode = 401
		res.end('Unauthorized')
		return
	}
	res.end(JSON.stringify({ status: 200 }))
	async function password_user_() {
		const jwt_token_decoded = await jwt_token_decoded_(req.headers['authorization']!)
		const user_id = user_id_(jwt_token_decoded)
		if (!user_id) return
		const get_auth0_v2_user_response = await get_auth0_v2_user_b(ctx)({ AUTH0_DOMAIN, user_id })
		const request_user = await get_auth0_v2_user_response.json()
		const { email } = request_user
		if (!email) return
		if (is_username_password_authentication(request_user)) {
			return request_user
		}
		const users_by_email_response = await get_auth0_v2_users_by_email_b(ctx)({ AUTH0_DOMAIN, email })
		const users = await users_by_email_response.json() as get_auth0_v2_users_by_email_response_T
		for (const user of users) {
			if (is_username_password_authentication(user)) return user
		}
	}
	function is_username_password_authentication(user:Auth0UserProfile) {
		return user.identities[0].connection == 'Username-Password-Authentication'
	}
}
export interface polka_post_auth0_change_password_Ctx extends auth0_management_Ctx, auth0_service_Ctx {
}
export interface polka_post_auth0_change_password_body_T {
	password:string
}
