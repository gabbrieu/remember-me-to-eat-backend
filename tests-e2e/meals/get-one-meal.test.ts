import { Meal } from '@domain/entities';
import { MealRoutes } from '@presentation/routes';
import { app } from '@server';
import { MealSetup, TestSetup } from '@test/shared';
import { ErrorResponse } from '@utils/errors.util';
import { afterAll, beforeAll, describe, expect, it } from 'bun:test';

describe('Get one meal route', () => {
    const baseURL: string = `${app.server?.hostname}:${app.server?.port}/meals`;
    let cookie: string, appTest: MealRoutes, mealMock: Meal;

    beforeAll(async () => {
        const setup = await MealSetup.setup();
        cookie = setup.cookie;
        appTest = setup.appTest;
        mealMock = setup.mealMock;
    });

    afterAll(async () => {
        await TestSetup.deleteAllData();
        await appTest.app.stop();
    });

    it('should get one meal', async () => {
        const response: Response = await appTest.app.handle(
            new Request(baseURL + `/${mealMock.id}`, {
                headers: {
                    cookie,
                },
            })
        );
        const responseBody: Meal = await response.json<Meal>();

        expect(response.status).toEqual(200);
        expect(responseBody).toStrictEqual(mealMock);
    });

    it('should throw a NOT_FOUND_ERROR when the meal does not exist', async () => {
        const idThatNotExists: number = 1297429;
        const response: Response = await appTest.app.handle(
            new Request(baseURL + `/${idThatNotExists}`, {
                headers: {
                    cookie,
                },
            })
        );
        const responseBody: ErrorResponse = await response.json<ErrorResponse>();

        expect(response.status).toEqual(404);
        expect(responseBody).toStrictEqual({ message: `Meal with id: ${idThatNotExists} not found` });
    });
});
