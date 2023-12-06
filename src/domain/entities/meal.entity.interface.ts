import { MealsEntity } from '@infrastructure/entities';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type Meal = InferSelectModel<typeof MealsEntity>;

export type ICreateMealDTO = Pick<InferInsertModel<typeof MealsEntity>, 'idUser' | 'image' | 'ingredients' | 'name' | 'schedule' | 'type'>;
