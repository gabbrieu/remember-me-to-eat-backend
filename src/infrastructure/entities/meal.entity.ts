import { relations, sql } from 'drizzle-orm';
import { integer, json, pgTable, serial, text, time, timestamp, varchar } from 'drizzle-orm/pg-core';
import { UsersEntity } from './user.entity';

export enum UnitEnum {
    UNIT = 'unit',
    KG = 'kg',
    G = 'g',
    ML = 'mL',
    L = 'L',
    TSP = 'tsp',
    TBSP = 'tbsp',
    CUP = 'cup',
}

export interface IIngredients {
    name: string;
    quantity?: number;
    unit?: UnitEnum;
}

export const MealsEntity = pgTable('meals', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 800 }).notNull(),
    image: text('image'),
    type: varchar('type', { length: 256 }).notNull(),
    ingredients: json('ingredients').$type<IIngredients[]>().notNull(),
    schedule: time('schedule', { withTimezone: true }).notNull(),
    idUser: integer('idUser')
        .references(() => UsersEntity.id, { onDelete: 'cascade', onUpdate: 'cascade' })
        .notNull(),
    createdAt: timestamp('created_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp('updated_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const mealRelations = relations(MealsEntity, ({ one }) => ({
    UsersEntity: one(UsersEntity, {
        fields: [MealsEntity.idUser],
        references: [UsersEntity.id],
    }),
}));
