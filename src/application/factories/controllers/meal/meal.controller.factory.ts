import { makeCreateMealUseCase, makeGetAllUserMealsUseCase, makeGetOneMealUseCase } from '@application/factories';
import { ICreateMealUseCase, IGetAllUserMealsUseCase, IGetOneMealUseCase } from '@domain/usecases';
import { MealsController } from '@presentation/controllers';

export const makeMealController = (): MealsController => {
    const createMealUseCase: ICreateMealUseCase = makeCreateMealUseCase();
    const getAllUserMealsUseCase: IGetAllUserMealsUseCase = makeGetAllUserMealsUseCase();
    const geOneMealUseCase: IGetOneMealUseCase = makeGetOneMealUseCase();

    return new MealsController(createMealUseCase, getAllUserMealsUseCase, geOneMealUseCase);
};
