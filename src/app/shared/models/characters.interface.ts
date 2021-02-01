export interface ICharacter {
  name: string;
  gender: string;
  birthYear: string;
  favorite: boolean;
  movie: Movie;
  comment: string;
}

export interface IStarWarsCharacter extends ICharacter {
  hairColor: string;
}

export interface ILordOfTheRingsCharacter extends ICharacter {
  deathYear: string;
  race: string;
}

export enum Movie {
  StarWars = 'Star Wars',
  LordOfTheRings = 'Lord Of The Rings'
}

export type IGeneralCharacter = IStarWarsCharacter | ILordOfTheRingsCharacter;
