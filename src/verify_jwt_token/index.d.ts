import type { verified_jwt_token_I } from '@ctx-core/auth0'
import { type Ctx } from '@ctx-core/object'
export declare function verify_jwt_token(ctx:Ctx, jwt_token:string):Promise<verified_jwt_token_I>
export const jwt_token_decoded_:typeof verify_jwt_token
