import { makeUsersController } from '@application/factories';
import { UserWithoutPassword } from '@domain/entities';
import { UsersController } from '@presentation/controllers';
import { AppType } from '@server';
import { isAuthenticated } from '@utils/auth.util';
import { transformNumber } from '@utils/transform.util';
import { Context, UserValidation } from '@validations/user';
import { serialize } from 'cookie';

export class UserRoutes {
    public readonly app: AppType;

    constructor(app: AppType) {
        this.app = app;

        this.initRoutes();
    }

    private initRoutes(): void {
        const userController: UsersController = makeUsersController();

        this.app.group('/users', (app) =>
            app
                .post(
                    '/login',
                    async ({ body, jwt, set, cookie: { auth } }): Promise<void> => {
                        const authToken: string = await userController.login(body, { jwt });

                        auth.set({
                            value: authToken,
                            httpOnly: true,
                            path: '/',
                        });
                        set.status = 'No Content';
                    },
                    {
                        body: UserValidation.userLogin(),
                    }
                )
                .post(
                    '/',
                    async ({ body, set }): Promise<UserWithoutPassword> => {
                        set.status = 'Created';
                        return await userController.create(body);
                    },
                    {
                        body: UserValidation.createUser(),
                    }
                )
                .use(isAuthenticated)
                .get('/', async (): Promise<UserWithoutPassword[]> => await userController.getAll())
                .get('/:id', async ({ params }): Promise<UserWithoutPassword> => await userController.getOne(params.id), {
                    params: UserValidation.simpleIdParam(),
                    transform: transformNumber,
                })
                .patch('/:id', async ({ body, params }): Promise<UserWithoutPassword> => await userController.update(params.id, body), {
                    body: UserValidation.updateUser(Context.BODY),
                    params: UserValidation.updateUser(Context.PARAMS),
                    transform: transformNumber,
                })
                .delete(
                    '/:id',
                    async ({ params, set }): Promise<void> => {
                        set.status = 'No Content';
                        await userController.delete(params.id);
                    },
                    { params: UserValidation.simpleIdParam(), transform: transformNumber }
                )
                .post('/logout', ({ set, cookie, cookie: { auth } }): void => {
                    set.headers['Set-Cookie'] = serialize(auth.name!, '', {
                        expires: new Date('Thu, Jan 01 1970 00:00:00 UTC'),
                        path: '/',
                    });
                    delete cookie.auth;

                    set.status = 'No Content';
                })
        );
    }
}
