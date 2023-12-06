import { ICreateMealDTO, Meal } from '@domain/entities';
import { ICreateMealUseCase } from '@domain/usecases';

export class MealsController {
    constructor(private readonly createMealsUseCase: ICreateMealUseCase) {}

    async create(body: ICreateMealDTO): Promise<Meal> {
        return await this.createMealsUseCase.execute(body);
    }
}
