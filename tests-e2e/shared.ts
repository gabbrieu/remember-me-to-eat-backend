import { ICreateMealDTO, ICreateUserDTO, IUserLoginDTO, Meal, UserWithoutPassword } from '@domain/entities';
import { db } from '@infrastructure/config';
import { UnitEnum } from '@infrastructure/entities';
import { MealRoutes, UserRoutes } from '@presentation/routes';
import { app } from '@server';
import { sql } from 'drizzle-orm';

export const createTestUserPayload: ICreateUserDTO = {
    name: 'test',
    email: 'test@gmail.com',
    password: 'test123',
};

export const createMealsPayload: ICreateMealDTO = {
    idUser: 1,
    name: 'Fit Lunch',
    type: 'Lunch',
    ingredients: [
        { name: 'Rice', quantity: 100, unit: UnitEnum.G },
        { name: 'Beans', quantity: 200, unit: UnitEnum.G },
        { name: 'Pork meat', quantity: 150, unit: UnitEnum.G },
        { name: 'Green salad', quantity: 100, unit: UnitEnum.G },
    ],
    schedule: '13:00',
};

export interface IUserSetup {
    userMock: UserWithoutPassword;
    cookie: string;
    appTest: UserRoutes;
}

export interface IMealSetup {
    mealMock: Meal;
    cookie: string;
    appTest: MealRoutes;
}

export abstract class TestSetup {
    static async deleteAllData(): Promise<void> {
        const tablenames = await db.execute(sql`SELECT tablename FROM pg_tables WHERE schemaname='public'`);
        const tables = tablenames
            .map(({ tablename }) => tablename)
            .filter((name) => name !== '__drizzle_migrations')
            .map((name) => `"public"."${name}"`)
            .join(', ');

        await db.execute(sql`TRUNCATE TABLE ${sql.raw(tables)} CASCADE;`);
        await db.execute(sql`ALTER SEQUENCE users_id_seq RESTART WITH 1;`);
        await db.execute(sql`ALTER SEQUENCE meals_id_seq RESTART WITH 1;`);
    }
}

export abstract class UserSetup {
    static async setup(): Promise<IUserSetup> {
        const appTest = new UserRoutes(app);
        const baseURL: string = `${app.server?.hostname}:${app.server?.port}/users`;

        const userMock: UserWithoutPassword = await appTest.app
            .handle(
                new Request(baseURL, {
                    method: 'POST',
                    body: JSON.stringify(createTestUserPayload),
                    headers: { 'Content-Type': 'application/json' },
                })
            )
            .then((res) => res.json());

        const loginResponse: Response = await appTest.app.handle(
            new Request(baseURL + '/login', {
                method: 'POST',
                body: JSON.stringify({ email: createTestUserPayload.email, password: createTestUserPayload.password } as IUserLoginDTO),
                headers: { 'Content-Type': 'application/json' },
            })
        );

        const cookie: string = loginResponse.headers.getSetCookie()[0].split(';')[0];

        return {
            userMock,
            cookie,
            appTest,
        };
    }

    static async createOneUserMock(): Promise<UserWithoutPassword> {
        const appTest = new UserRoutes(app);
        const baseURL: string = `${app.server?.hostname}:${app.server?.port}/users`;

        const userMock: UserWithoutPassword = await appTest.app
            .handle(
                new Request(baseURL, {
                    method: 'POST',
                    body: JSON.stringify(createTestUserPayload),
                    headers: { 'Content-Type': 'application/json' },
                })
            )
            .then((res) => res.json());

        return userMock;
    }
}

export abstract class MealSetup {
    static async setup(mealQuantity: number = 1): Promise<IMealSetup> {
        const baseURL: string = `${app.server?.hostname}:${app.server?.port}/meals`;
        const appTest = new MealRoutes(app);
        const { cookie } = await UserSetup.setup();

        let mealMock: Meal = {} as Meal;
        for (let i = 0; i < mealQuantity; i++) {
            mealMock = await appTest.app
                .handle(
                    new Request(baseURL, {
                        method: 'POST',
                        headers: {
                            cookie,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(createMealsPayload),
                    })
                )
                .then((res) => res.json());
        }

        return {
            cookie,
            mealMock,
            appTest,
        };
    }
}
