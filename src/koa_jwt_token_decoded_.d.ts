import type { jwt_token_decoded_I } from '@ctx-core/auth0'
import type { Ctx } from '@ctx-core/object'
export declare function koa_jwt_token_decoded_(
	ctx:Ctx, authorization:string|undefined
):Promise<jwt_token_decoded_I>
