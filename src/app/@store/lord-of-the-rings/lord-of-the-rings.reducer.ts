import { createReducer, on } from '@ngrx/store';
import {
  loadLordOfTheRings,
  loadLordOfTheRingsFailed,
  loadLordOfTheRingsSuccess, updateLordOfTheRingsComment, updateLordOfTheRingsFavorites,
} from './lord-of-the-rings.actions';
import { LordOfTheRingsState } from '../app.state.interface';

const initialState: LordOfTheRingsState = {
  characters: [],
  nextPage: 1,
  isLoading: true,
  error: false
};

const reducer = createReducer(
  initialState,
  on(loadLordOfTheRings, (state: LordOfTheRingsState) => ({
    ...state,
    isLoading: true,
    error: false
  })),
  on(loadLordOfTheRingsSuccess, (state: LordOfTheRingsState, { payload }) => ({
    ...state,
    characters: [
      ...state.characters,
      ...payload.characters
    ],
    isLoading: false,
    error: false,
    nextPage: payload.page + 1
  })),
  on(loadLordOfTheRingsFailed, (state: LordOfTheRingsState) => ({
    ...state,
    isLoading: false,
    error: true
  })),
  on(updateLordOfTheRingsFavorites, (state: LordOfTheRingsState, { payload }) => {
    const characters = [...state.characters];
    const index = characters.findIndex(({ name }) => name === payload);

    characters[index] = {
      ...characters[index],
      favorite: !characters[index].favorite
    };

    return {
      ...state,
      characters
    };
  }),
  on(updateLordOfTheRingsComment, (state: LordOfTheRingsState, { payload }) => {
    const { name: charName, comment } = payload;
    const characters = [...state.characters];
    const index = characters.findIndex(({ name }) => name === charName);

    characters[index] = {
      ...characters[index],
      comment
    };

    return {
      ...state,
      characters
    };
  })
);

export function lordOfTheRingsReducer(state: LordOfTheRingsState, action) {
  return reducer(state, action);
}
