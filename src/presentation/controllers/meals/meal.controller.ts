import { ICreateMealDTO, Meal } from '@domain/entities';
import { ICreateMealUseCase, IGetAllUserMealsUseCase, IGetOneMealUseCase } from '@domain/usecases';

export class MealsController {
    constructor(
        private readonly createMealsUseCase: ICreateMealUseCase,
        private readonly getAllUserMealsUseCase: IGetAllUserMealsUseCase,
        private readonly getOneMealUseCase: IGetOneMealUseCase
    ) {}

    async create(body: ICreateMealDTO): Promise<Meal> {
        return await this.createMealsUseCase.execute(body);
    }

    async getAllUserMeals(idUser: number): Promise<Meal[]> {
        return await this.getAllUserMealsUseCase.execute(idUser);
    }

    async getOne(id: number): Promise<Meal> {
        return await this.getOneMealUseCase.execute(id);
    }
}
