import { Meal } from '@domain/entities';
import { MealRoutes } from '@presentation/routes';
import { app } from '@server';
import { TestSetup, UserSetup, createMealsPayload } from '@test/shared';
import { afterAll, afterEach, beforeEach, describe, expect, it } from 'bun:test';

describe('Create meal route', () => {
    const baseURL: string = `${app.server?.hostname}:${app.server?.port}/meals`;
    const appTest = new MealRoutes(app);
    let cookie: string;

    beforeEach(async () => {
        const setup = await UserSetup.setup();
        cookie = setup.cookie;
    });

    afterEach(async () => {
        await TestSetup.deleteAllData();
    });

    afterAll(async () => {
        await appTest.app.stop();
    });

    it('should create one meal', async () => {
        const response: Response = await appTest.app.handle(
            new Request(baseURL, {
                method: 'POST',
                headers: {
                    cookie,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createMealsPayload),
            })
        );
        const responseBody: Meal = await response.json<Meal>();

        expect(response.status).toBe(201);
        expect(responseBody.id).toBe(1);
        expect(responseBody).toMatchObject({ ...createMealsPayload, schedule: '13:00:00+00' });
    });
});
