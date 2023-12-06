import { makeCreateMealUseCase, makeGetAllUserMealsUseCase } from '@application/factories';
import { ICreateMealUseCase, IGetAllUserMealsUseCase } from '@domain/usecases';
import { MealsController } from '@presentation/controllers';

export const makeMealController = (): MealsController => {
    const createMealUseCase: ICreateMealUseCase = makeCreateMealUseCase();
    const getAllUserMealsUseCase: IGetAllUserMealsUseCase = makeGetAllUserMealsUseCase();

    return new MealsController(createMealUseCase, getAllUserMealsUseCase);
};
