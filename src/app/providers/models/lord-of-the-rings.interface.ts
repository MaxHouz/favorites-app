export interface ILordOfTheRingsResponse {
  docs: ILordOfTheRingsResponseChar[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export interface ILordOfTheRingsResponseChar {
  birth: string;
  death: string;
  gender: string;
  hair: string;
  height: string;
  name: string;
  race: string;
  realm: string;
  spouse: string;
  wikiUrl: string;
  _id: string;
}
