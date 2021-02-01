import { ILordOfTheRingsCharacter, IStarWarsCharacter } from '../shared/models/characters.interface';

export interface IAppState {
  starWars: StarWarsState;
  lordOfTheRings: LordOfTheRingsState;
}

export type StarWarsState = IMovieState<IStarWarsCharacter>;
export type LordOfTheRingsState = IMovieState<ILordOfTheRingsCharacter>;

interface IMovieState<T> {
  characters: T[];
  nextPage: number;
  isLoading: boolean;
  error: boolean;
}
