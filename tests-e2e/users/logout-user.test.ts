import { UserWithoutPassword } from '@domain/entities';
import { UserRoutes } from '@presentation/routes';
import { app } from '@server';
import { IUserSetup, UserSetup } from '@test/shared';
import { afterAll, beforeAll, describe, expect, it } from 'bun:test';

describe('Logout route', () => {
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

    it('should logout the user', async () => {
        const response: Response = await appTest.app.handle(
            new Request(baseURL + `/logout`, { method: 'POST', headers: { cookie: cookie } })
        );

        expect(response.status).toBe(204);
        expect(response.headers.getSetCookie()).toStrictEqual(['auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT']);
    });
});
