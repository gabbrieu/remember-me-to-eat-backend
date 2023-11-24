import { TNumber, TObject, TOptional, TString } from '@sinclair/typebox';
import { t } from 'elysia';

export enum Context {
    BODY = 'body',
    PARAMS = 'params',
}

type SimpleIdParam = TObject<{ id: TNumber }>;

type UpdateUserParamOrBody<T extends Context.BODY | Context.PARAMS> = T extends Context.PARAMS
    ? SimpleIdParam
    : TObject<{ name: TOptional<TString> }>;

export abstract class UserValidation {
    static createUser() {
        return t.Object({
            name: t.String(),
            email: t.String({ format: 'email', default: 'example@email.com' }),
            password: t.String(),
        });
    }

    static simpleIdParam(): SimpleIdParam {
        return t.Object({ id: t.Number({ minimum: 0 }) });
    }

    static updateUser<T extends Context.BODY | Context.PARAMS>(type: T): UpdateUserParamOrBody<T> {
        return type === Context.PARAMS
            ? (t.Object({ id: t.Number({ minimum: 0 }) }) as UpdateUserParamOrBody<T>)
            : (t.Object({
                  name: t.Optional(t.String()),
              }) as UpdateUserParamOrBody<T>);
    }

    static userLogin() {
        return t.Object({ email: t.String({ format: 'email', default: 'example@email.com' }), password: t.String() });
    }
}
