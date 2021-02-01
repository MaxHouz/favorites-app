import { createSelector } from '@ngrx/store';
import { IStarWarsCharacter } from '../../shared/models/characters.interface';
import { IAppState, StarWarsState } from '../app.state.interface';

const selectStarWars = (state: IAppState): StarWarsState => {
  return state.starWars;
};

export const selectStarWarsChars = createSelector(
  selectStarWars,
  (state: StarWarsState): IStarWarsCharacter[] => state.characters
);

export const selectStarWarsPage = createSelector(
  selectStarWars,
  (state: StarWarsState): number => state.nextPage
);

export const isLastStarWarsPage = createSelector(
  selectStarWars,
  (state: StarWarsState): boolean => state.characters.length >= 50
);

export const isStarWarsLoading = createSelector(
  selectStarWars,
  (state: StarWarsState): boolean => state.isLoading
);
