import { ICreateMealDTO, Meal } from '@domain/entities';

export interface ICreateMealUseCase {
    execute(body: ICreateMealDTO): Promise<Meal>;
}
