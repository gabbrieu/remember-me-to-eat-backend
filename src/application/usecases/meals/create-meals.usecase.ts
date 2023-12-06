import { ICreateMealDTO, Meal } from '@domain/entities';
import { ICreateMealUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { MealsEntity } from '@infrastructure/entities';
import { UseCaseError } from '@utils/errors.util';

export class CreateMealsUseCase implements ICreateMealUseCase {
    async execute(body: ICreateMealDTO): Promise<Meal> {
        try {
            const meal: Meal[] = await db.insert(MealsEntity).values(body).returning({
                id: MealsEntity.id,
                name: MealsEntity.name,
                image: MealsEntity.image,
                type: MealsEntity.type,
                ingredients: MealsEntity.ingredients,
                schedule: MealsEntity.schedule,
                idUser: MealsEntity.idUser,
                createdAt: MealsEntity.createdAt,
                updatedAt: MealsEntity.updatedAt,
            });

            return meal[0];
        } catch (error) {
            throw new UseCaseError(error);
        }
    }
}
