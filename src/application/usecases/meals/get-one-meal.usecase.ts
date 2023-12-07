import { Meal } from '@domain/entities';
import { IGetOneMealUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { MealsEntity } from '@infrastructure/entities';
import { eq } from 'drizzle-orm';

export class GetOneMealUseCase implements IGetOneMealUseCase {
    async execute(id: number): Promise<Meal> {
        const meal: Meal[] = await db.select().from(MealsEntity).where(eq(MealsEntity.id, id));

        return meal[0];
    }
}
