import { UserWithoutPassword } from '@domain/entities';
import { UserRoutes } from '@presentation/routes';
import { app } from '@server';
import { IUserSetup, UserSetup } from '@test/shared';
import { ErrorResponse } from '@utils/errors.util';
import { afterAll, beforeAll, describe, expect, it } from 'bun:test';

describe('Get one user route', () => {
    const baseURL: string = `${app.server?.hostname}:${app.server?.port}/users`;
    let appTest: UserRoutes;
    let userMock: UserWithoutPassword;
    let cookie: string;

    beforeAll(async () => {
        const userSetup: IUserSetup = await UserSetup.setup();
        userMock = userSetup.userMock;
        cookie = userSetup.cookie;
        appTest = userSetup.appTest;
    });

    afterAll(async () => {
        await UserSetup.deleteAllData();
        await appTest.app.stop();
    });

    it('should get one user', async () => {
        const response = await appTest.app.handle(new Request(baseURL + `/${userMock.id}`, { headers: { cookie: cookie } }));
        const responseBody: UserWithoutPassword = await response.json<UserWithoutPassword>();

        expect(response.status).toBe(200);
        expect(responseBody).toStrictEqual(userMock);
    });

    it('should throw a NOT_FOUND_ERROR when the user does not exists', async () => {
        const idThatNotExists: number = 9120912;
        const response: Response = await appTest.app.handle(new Request(baseURL + `/${idThatNotExists}`, { headers: { cookie: cookie } }));
        const responseBody: ErrorResponse = await response.json<ErrorResponse>();

        expect(response.status).toBe(404);
        expect(responseBody).toStrictEqual({ message: `User with id: ${idThatNotExists}, not found` });
    });
});
