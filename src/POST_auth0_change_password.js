/// <reference lib="dom" />
import { user_id_ } from '@ctx-core/auth0'
import {
	get_auth0_v2_user, get_auth0_v2_users_by_email, patch_auth0_v2_user
} from '@ctx-core/auth0-management'
import { header_authorization_jwt_token_ } from '@ctx-core/jwt'
import { log } from '@ctx-core/logger'
import { verify_jwt_token } from './verify_jwt_token.js'
const logPrefix = '@ctx-core/auth0-service/node/POST_auth0_change_password.ts'
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
if (!AUTH0_DOMAIN) throw `AUTH0_DOMAIN env variable not defined`
/** @typedef {import('auth0-js').Auth0UserProfile} Auth0UserProfile */
/** @type {import('./POST_auth0_change_password.d.ts').POST_auth0_change_password} */
export const POST_auth0_change_password = async (ctx, request)=>{
	log(`${logPrefix}|POST_auth0_change_password`)
	const authorization_header = request.headers['authorization']
	const jwt_token = header_authorization_jwt_token_(authorization_header)
	if (!jwt_token) {
		return new Response('Unauthorized', { status: 401 })
	}
	const password_user = await password_user_()
	const { user_id } = password_user
	if (!password_user) {
		return new Response('Unauthorized', { status: 401 })
	}
	const body = await request.json()
	const { password } = body
	const [user, response] = await patch_auth0_v2_user(ctx, user_id, { password })
	if (user.error) {
		console.trace(`patch_auth0_v2_user error response: ${response.status}:\n${user}`)
		return new Response('Unauthorized', { status: 401 })
	}
	return new Response(body, {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	})
	async function password_user_() {
		const jwt_token_decoded = await verify_jwt_token(ctx, request.headers['authorization'])
		const user_id = user_id_(jwt_token_decoded)
		if (!user_id) return
		const [request_user] = await get_auth0_v2_user(ctx, { AUTH0_DOMAIN, user_id })
		const { email } = request_user
		if (!email) return
		if (is_username_password_authentication(request_user)) {
			return request_user
		}
		const [auth0_user_profile_a] = await get_auth0_v2_users_by_email(ctx, { AUTH0_DOMAIN, email })
		for (const auth0_user_profile of auth0_user_profile_a) {
			if (is_username_password_authentication(auth0_user_profile)) return auth0_user_profile
		}
	}
	/**
	 * @param {Auth0UserProfile} user
	 * @returns {boolean}
	 */
	function is_username_password_authentication(user) {
		return user.identities[0].connection == 'Username-Password-Authentication'
	}
}
