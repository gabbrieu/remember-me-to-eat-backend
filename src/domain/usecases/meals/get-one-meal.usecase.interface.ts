import { Meal } from '@domain/entities';

export interface IGetOneMealUseCase {
    execute(id: number): Promise<Meal>;
}
