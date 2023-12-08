import { Meal } from '@domain/entities';
import { MealRoutes } from '@presentation/routes';
import { app } from '@server';
import { MealSetup, TestSetup, UserSetup, createMealsPayload } from '@test/shared';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'bun:test';

describe('Get all user meals route', () => {
    const appTest: MealRoutes = new MealRoutes(app);
    const baseURL: string = `${app.server?.hostname}:${app.server?.port}/meals`;
    let cookie: string;

    beforeAll(async () => {
        const setup = await UserSetup.setup();
        cookie = setup.cookie;
    });

    afterEach(async () => {
        await TestSetup.deleteAllData();
        await appTest.app.stop();
    });

    afterAll(async () => {
        await appTest.app.stop();
    });

    it('should get an empty array when the user does not have a registered meal', async () => {
        const response: Response = await appTest.app.handle(
            new Request(baseURL, {
                headers: {
                    cookie,
                },
            })
        );

        const body = await response.json<Meal[]>();

        expect(response.status).toBe(200);
        expect(body).toBeArray();
        expect(body).toBeArrayOfSize(0);
    });

    it('should return a meal array when the user has meals', async () => {
        await MealSetup.setup();

        const response: Response = await appTest.app.handle(
            new Request(baseURL, {
                headers: {
                    cookie,
                },
            })
        );

        const body = await response.json<Meal[]>();

        expect(response.status).toBe(200);
        expect(body).toBeArray();
        expect(body).toBeArrayOfSize(1);
        expect(body).toMatchObject([{ ...createMealsPayload, id: 1, schedule: '13:00:00+00' }]);
    });
});
