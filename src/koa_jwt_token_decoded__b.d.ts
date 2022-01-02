import type { jwt_token_decoded_I } from '@ctx-core/auth0'
import type { B } from '@ctx-core/object'
export const koa_jwt_token_decoded__b:B<koa_jwt_token_decoded__T>
export type koa_jwt_token_decoded__T = (authorization:string|undefined)=>Promise<jwt_token_decoded_I>
