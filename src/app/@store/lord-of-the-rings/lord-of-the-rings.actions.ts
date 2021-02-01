import { createAction, props } from '@ngrx/store';
import { ILordOfTheRingsCharacter } from '../../shared/models/characters.interface';

export const loadLordOfTheRings = createAction(
  '[Lord Of The Rings] Load'
);

export const loadLordOfTheRingsSuccess = createAction(
  '[Lord Of The Rings] Load Success',
  props<{ payload: { characters: ILordOfTheRingsCharacter[], page: number } }>()
);

export const loadLordOfTheRingsFailed = createAction(
  '[Lord Of The Rings] Load Failed'
);

export const updateLordOfTheRingsFavorites = createAction(
  '[Lord Of The Rings] Add to Favorites',
  props<{ payload: string }>()
);

export const updateLordOfTheRingsComment = createAction(
  '[Lord Of The Rings] Update Comment',
  props<{ payload: { comment: string, name: string } }>()
);
