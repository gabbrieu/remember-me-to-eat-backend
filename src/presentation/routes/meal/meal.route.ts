import { makeMealController } from '@application/factories';
import { MealsController } from '@presentation/controllers';
import { AppType } from '@server';
import { isAuthenticated } from '@utils/auth.util';
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
                    async ({ body }) => {
                        await mealsController.create(body);
                    },
                    {
                        body: MealValidation.createMeal(),
                    }
                )
                .get('/', async ({ userJWT }) => {
                    return await mealsController.getAllUserMeals(userJWT.id);
                })
        );
    }
}
