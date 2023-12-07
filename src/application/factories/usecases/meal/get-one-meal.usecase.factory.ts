import { GetOneMealUseCase } from '@application/usecases';
import { IGetOneMealUseCase } from '@domain/usecases';

export const makeGetOneMealUseCase = (): IGetOneMealUseCase => {
    return new GetOneMealUseCase();
};
