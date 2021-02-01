import { createSelector } from '@ngrx/store';
import { IGeneralCharacter } from '../shared/models/characters.interface';
import { selectStarWarsChars } from './star-wars/star-wars.selectors';
import { selectLordOfTheRingsChars } from './lord-of-the-rings/lord-of-the-rings.selectors';

export const selectFavorites = createSelector(
  selectStarWarsChars,
  selectLordOfTheRingsChars,
  (starWars, lordOfTheRings): IGeneralCharacter[] => {
    const starWarsFavorites = starWars.filter((char) => char.favorite);
    const lordOfTheFavorites = lordOfTheRings.filter((char) => char.favorite);

    return [
      ...starWarsFavorites,
      ...lordOfTheFavorites
    ];
  }
);
