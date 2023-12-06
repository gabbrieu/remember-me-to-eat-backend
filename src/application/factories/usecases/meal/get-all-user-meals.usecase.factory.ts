import { GetAllUserMealsUseCase } from '@application/usecases/meals/get-all-user-meals.usecase';
import { IGetAllUserMealsUseCase } from '@domain/usecases';

export const makeGetAllUserMealsUseCase = (): IGetAllUserMealsUseCase => {
    return new GetAllUserMealsUseCase();
};
