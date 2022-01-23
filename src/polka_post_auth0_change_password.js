import { user_id_ } from '@ctx-core/auth0'
import {
	get_auth0_v2_user_b, get_auth0_v2_users_by_email_b, patch_auth0_v2_user_b
} from '@ctx-core/auth0-management'
import { header_authorization_jwt_token_ } from '@ctx-core/jwt'
import { log } from '@ctx-core/logger'
import { ctx_ } from '@ctx-core/object'
import { jwt_token_decoded__b } from './jwt_token_decoded__b.js'
const logPrefix = '@ctx-core/auth0-service/node/polka_post_auth0_change_password.ts'
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
if (!AUTH0_DOMAIN) throw `AUTH0_DOMAIN env variable not defined`
/** @typedef {import('auth0-js').Auth0UserProfile} Auth0UserProfile */
/** @type {import('./polka_post_auth0_change_password.d.ts').polka_post_auth0_change_password} */
export const polka_post_auth0_change_password = async (
	req, res
)=>{
	log(`${logPrefix}|polka_post_auth0_change_password`)
	const ctx = ctx_()
	const authorization_header = req.headers['authorization']
	const jwt_token = header_authorization_jwt_token_(authorization_header)
	if (!jwt_token) {
		return response_(401, 'Unauthorized')
	}
	const jwt_token_decoded_ = jwt_token_decoded__b(ctx)
	const password_user = await password_user_()
	const { user_id } = password_user
	if (!password_user) {
		return response_(401, 'Unauthorized')
	}
	const { body } = req
	const { password } = body
	const [user, response] = await patch_auth0_v2_user_b(ctx)(user_id, { password })
	if (user.error) {
		console.trace(`patch_auth0_v2_user error response: ${response.status}:\n${user}`)
		return response_(401, 'Unauthorized')
	}
	return response_(
		200, JSON.stringify({ status: 200 }), { 'Content-Type': 'application/json' }
	)
	function response_(status, body, headers) {
		if (res) {
			res.write(status, headers)
			res.end(body)
		}
		return new Response(body, { status })
	}
	async function password_user_() {
		const jwt_token_decoded = await jwt_token_decoded_(req.headers['authorization'])
		const user_id = user_id_(jwt_token_decoded)
		if (!user_id) return
		const [request_user] = await get_auth0_v2_user_b(ctx)({ AUTH0_DOMAIN, user_id })
		const { email } = request_user
		if (!email) return
		if (is_username_password_authentication(request_user)) {
			return request_user
		}
		const users_by_email_response = await get_auth0_v2_users_by_email_b(ctx)({ AUTH0_DOMAIN, email })
		const users = await users_by_email_response.json()
		for (const user of users) {
			if (is_username_password_authentication(user)) return user
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
