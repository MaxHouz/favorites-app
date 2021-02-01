import { createSelector } from '@ngrx/store';
import { ILordOfTheRingsCharacter } from '../../shared/models/characters.interface';
import { IAppState, LordOfTheRingsState } from '../app.state.interface';

const selectLordOfTheRings = (state: IAppState): LordOfTheRingsState => {
  return state.lordOfTheRings;
};

export const selectLordOfTheRingsChars = createSelector(
  selectLordOfTheRings,
  (state: LordOfTheRingsState): ILordOfTheRingsCharacter[] => state.characters
);

export const selectLordOfTheRingsPage = createSelector(
  selectLordOfTheRings,
  (state: LordOfTheRingsState): number => state.nextPage
);

export const isLastLordOfTheRingsPage = createSelector(
  selectLordOfTheRings,
  (state: LordOfTheRingsState): boolean => state.characters.length >= 50
);

export const isLordOfTheRingsLoading = createSelector(
  selectLordOfTheRings,
  (state: LordOfTheRingsState): boolean => state.isLoading
);
