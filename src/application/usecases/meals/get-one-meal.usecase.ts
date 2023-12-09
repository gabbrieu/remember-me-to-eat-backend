import { Meal } from '@domain/entities';
import { IGetOneMealUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { MealsEntity } from '@infrastructure/entities';
import { UseCaseError } from '@utils/errors.util';
import { eq } from 'drizzle-orm';
import { NotFoundError } from 'elysia';

export class GetOneMealUseCase implements IGetOneMealUseCase {
    async execute(id: number): Promise<Meal> {
        try {
            const meal: Meal | undefined = (await db.select().from(MealsEntity).where(eq(MealsEntity.id, id))).at(0);

            if (!meal) {
                throw new NotFoundError(`Meal with id: ${id} not found`);
            }

            return meal;
        } catch (error) {
            throw new UseCaseError(error);
        }
    }
}
