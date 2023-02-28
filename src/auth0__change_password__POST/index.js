/// <reference lib="dom" />
import { auth0__unauthorized__error_, auth0__user_id_ } from '@ctx-core/auth0'
import {
	auth0__v2_user__fetch_get,
	auth0__v2_user__fetch_patch,
	auth0__v2_users_by_email__fetch_get,
} from '@ctx-core/auth0-management'
import { Headers } from '@ctx-core/fetch-undici'
import { authorization__header__jwt_token_ } from '@ctx-core/jwt'
import { log } from '@ctx-core/logger'
import { auth0__access_token_o_ } from '../auth0__access_token_o_/index.js'
/** @typedef {import('auth0').User}User */
/** @typedef {import('@ctx-core/object').Ctx}Ctx */
const logPrefix = '@ctx-core/auth0-service > auth0__change_password__POST'
/**
 * @param {Ctx}ctx
 * @param {Request}request
 * @returns {Promise<Response>}
 */
export async function auth0__change_password__POST(ctx, request) {
	log(`${logPrefix}|auth0__change_password__POST`)
	const authorization = request.headers.get('authorization')
	const access_token = authorization__header__jwt_token_(authorization)
	if (!access_token) {
		return unauthorized_response_()
	}
	/** @type {User} */
	let password_user
	try {
		password_user = await password_user_()
	} catch (err) {
		if (err.name !== 'JsonWebTokenError') {
			throw err
		}
		console.error(err)
	}
	if (!password_user) {
		return new Response('Unauthorized', { status: 401 })
	}
	const { user_id } = password_user
	const text = await request.text()
	const json = JSON.parse(text)
	const { password } = json
	const [user, response] =
		await auth0__v2_user__fetch_patch(ctx, user_id, { password })
	if (!response.ok) {
		if (user.error) {
			console.trace(`auth0__v2_user__fetch_patch error response: ${response.status}:\n${user}`)
			return unauthorized_response_()
		}
	}
	return new Response(text, {
		status: 200, headers: new Headers({ 'Content-Type': 'application/json' })
	})
	/**
	 * @returns {Promise<User|undefined>}
	 * @private
	 */
	async function password_user_() {
		const access_token_o = await auth0__access_token_o_(ctx, access_token)
		const user_id = auth0__user_id_(access_token_o)
		if (!user_id) return
		const [request_user] =
			await auth0__v2_user__fetch_get(ctx, { AUTH0_DOMAIN, user_id })
		const { email } = request_user
		if (!email) return
		if (is_username_password_authentication(request_user)) {
			return request_user
		}
		const [auth0_user_profile_a] =
			await auth0__v2_users_by_email__fetch_get(ctx, { AUTH0_DOMAIN, email })
		for (const auth0_user_profile of auth0_user_profile_a) {
			if (is_username_password_authentication(auth0_user_profile)) return auth0_user_profile
		}
	}
	/**
	 * @param {User} user
	 * @returns {boolean}
	 */
	function is_username_password_authentication(user) {
		return user.identities[0].connection === 'Username-Password-Authentication'
	}
}
export {
	auth0__change_password__POST as POST_auth0_change_password,
}
/**
 * @returns {Response}
 * @private
 */
function unauthorized_response_() {
	return new Response(JSON.stringify(auth0__unauthorized__error_()), {
		status: 401, headers: new Headers({ 'Content-Type': 'application/json' })
	})
}
