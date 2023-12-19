import type { Ctx } from 'ctx-core/be'
export declare function auth0__header__authorization__email__validate(
	ctx:Ctx,
	authorization:string
):Promise<string>
export {
	auth0__header__authorization__email__validate as verify_jwt_email,
}
