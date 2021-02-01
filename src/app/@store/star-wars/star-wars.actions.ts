import { createAction, props } from '@ngrx/store';
import { IStarWarsCharacter } from '../../shared/models/characters.interface';

export const loadStarWars = createAction(
  '[Star Wars] Load'
);

export const loadStarWarsSuccess = createAction(
  '[Star Wars] Load Success',
  props<{ payload: { characters: IStarWarsCharacter[], page: number } }>()
);

export const loadStarWarsFailed = createAction(
  '[Star Wars] Load Failed'
);

export const updateStarWarsFavorites = createAction(
  '[Star Wars] Add to Favorites',
  props<{ payload: string }>()
);

export const updateStarWarsComment = createAction(
  '[Star Wars] Update Comment',
  props<{ payload: { comment: string, name: string } }>()
);
