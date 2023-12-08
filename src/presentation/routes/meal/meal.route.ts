import { makeMealController } from '@application/factories';
import { Meal } from '@domain/entities';
import { MealsController } from '@presentation/controllers';
import { AppType } from '@server';
import { isAuthenticated } from '@utils/auth.util';
import { transformNumber } from '@utils/transform.util';
import { MealValidation } from '@validations/meal';

export class MealRoutes {
    public readonly app: AppType;

    constructor(app: AppType) {
        this.app = app;

        this.initRoutes();
    }

    private initRoutes(): void {
        const mealsController: MealsController = makeMealController();

        this.app.group('meals', (app) =>
            app
                .use(isAuthenticated)
                .post(
                    '/',
                    async ({ body, set }): Promise<Meal> => {
                        set.status = 'Created';
                        return await mealsController.create(body);
                    },
                    {
                        body: MealValidation.createMeal(),
                    }
                )
                .get('/', async ({ userJWT }): Promise<Meal[]> => {
                    return await mealsController.getAllUserMeals(userJWT.id);
                })
                .get(
                    '/:id',
                    async ({ params }): Promise<Meal> => {
                        return await mealsController.getOne(params.id);
                    },
                    {
                        params: MealValidation.simpleIdParam(),
                        transform: transformNumber,
                    }
                )
        );
    }
}
