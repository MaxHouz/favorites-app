import { createReducer, on } from '@ngrx/store';
import {
  loadStarWars, loadStarWarsFailed,
  loadStarWarsSuccess, updateStarWarsComment,
  updateStarWarsFavorites
} from './star-wars.actions';
import { StarWarsState } from '../app.state.interface';

const initialState: StarWarsState = {
    characters: [],
    nextPage: 1,
    isLoading: false,
    error: false
};

const reducer = createReducer(
  initialState,
  on(loadStarWars, (state: StarWarsState) => ({
    ...state,
    isLoading: true,
    error: false
  })),
  on(loadStarWarsSuccess, (state: StarWarsState, { payload }) => ({
    ...state,
    characters: [
      ...state.characters,
      ...payload.characters
    ],
    isLoading: false,
    error: false,
    nextPage: payload.page + 1
  })),
  on(loadStarWarsFailed, (state: StarWarsState) => ({
    ...state,
    isLoading: false,
    error: true
  })),
  on(updateStarWarsFavorites, (state: StarWarsState, { payload }) => {
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
  on(updateStarWarsComment, (state: StarWarsState, { payload }) => {
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

export function starWarsReducer(state: StarWarsState, action) {
  return reducer(state, action);
}
