import { Meal } from '@domain/entities';

export interface IGetAllUserMealsUseCase {
    execute(idUser: number): Promise<Meal[]>;
}
