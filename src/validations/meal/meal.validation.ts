import { UnitEnum } from '@infrastructure/entities';
import { t } from 'elysia';

export abstract class MealValidation {
    static createMeal() {
        return t.Object({
            name: t.String(),
            type: t.String(),
            image: t.Optional(t.String()),
            ingredients: t.Array(
                t.Object({
                    name: t.String(),
                    quantity: t.Optional(t.Number()),
                    unit: t.Optional(t.Enum(UnitEnum)),
                }),
                {
                    default: [
                        {
                            name: '',
                            quantity: 1,
                            unit: 'unit | kg | g | mL | L | tsp | tbsp | cup',
                        },
                    ],
                }
            ),
            schedule: t.RegExp('^([0-1][0-9]|2[0-3]):[0-5][0-9]$', { default: '17:00' }),
            idUser: t.Number(),
        });
    }
}
