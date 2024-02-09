import type { ctx_T } from 'ctx-core/be'
export declare function auth0__header__authorization__user_id__validate(
	ctx:ctx_T,
	authorization:string
):Promise<string>
export {
	auth0__header__authorization__user_id__validate as verify_jwt_user_id,
}
