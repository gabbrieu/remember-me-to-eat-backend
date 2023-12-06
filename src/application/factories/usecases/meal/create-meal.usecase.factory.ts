import { CreateMealsUseCase } from '@application/usecases';
import { ICreateMealUseCase } from '@domain/usecases';

export const makeCreateMealUseCase = (): ICreateMealUseCase => {
    return new CreateMealsUseCase();
};
