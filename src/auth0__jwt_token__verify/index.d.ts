import type { auth0__verified__jwt_token_T } from '@ctx-core/auth0'
import type { Ctx } from '@ctx-core/object'
export declare function auth0__jwt_token__verify(ctx:Ctx, jwt_token:string):Promise<auth0__verified__jwt_token_T>
export {
	auth0__jwt_token__verify as verify_jwt_token,
	auth0__jwt_token__verify as jwt_token_decoded_,
}
