import { makeCreateMealUseCase } from '@application/factories';
import { ICreateMealUseCase } from '@domain/usecases';
import { MealsController } from '@presentation/controllers';

export const makeMealController = (): MealsController => {
    const createMealUseCase: ICreateMealUseCase = makeCreateMealUseCase();

    return new MealsController(createMealUseCase);
};
