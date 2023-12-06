import { Meal } from '@domain/entities';
import { IGetAllUserMealsUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { MealsEntity } from '@infrastructure/entities';
import { UseCaseError } from '@utils/errors.util';
import { eq } from 'drizzle-orm';

export class GetAllUserMealsUseCase implements IGetAllUserMealsUseCase {
    async execute(idUser: number): Promise<Meal[]> {
        try {
            const meals: Meal[] = await db.select().from(MealsEntity).where(eq(MealsEntity.idUser, idUser));

            return meals;
        } catch (error) {
            throw new UseCaseError(error);
        }
    }
}
