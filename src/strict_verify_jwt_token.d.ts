import type { verified_jwt_token_I } from '@ctx-core/auth0'
import type { Ctx } from '@ctx-core/object'
export declare function strict_verify_jwt_token(
	ctx:Ctx, authorization:string|undefined
):Promise<verified_jwt_token_I>
