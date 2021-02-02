import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILordOfTheRingsCharacter, IStarWarsCharacter, Movie } from '../../shared/models/characters.interface';
import { IStarWarsResponse } from '../models/star-wars.interface';
import { map } from 'rxjs/operators';
import { ILordOfTheRingsResponse } from '../models/lord-of-the-rings.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(private http: HttpClient) { }

  public getStarWars(page = 1): Observable<IStarWarsCharacter[]> {
    return this.http.get<IStarWarsResponse>(`https://swapi.dev/api/people`, {
      params: {
        page: page.toString()
      }
    }).pipe(
      map((res: IStarWarsResponse) => {
        return res.results.map(char => {
          return {
            name: char.name,
            gender: char.gender,
            birthYear: char.birth_year,
            hairColor: char.hair_color,
            favorite: false,
            movie: Movie.StarWars,
            comment: ''
          };
        });
      }),
    );
  }

  public getLordOfTheRings(page = 1): Observable<ILordOfTheRingsCharacter[]> {
    return this.http.get<ILordOfTheRingsResponse>(`https://the-one-api.dev/v2/character`, {
      headers: {
        Authorization: `Bearer ${environment.lotrToken}`
      },
      params: {
        page: page.toString(),
        limit: '10'
      }
    }).pipe(
      map(res => {
        return res.docs.map(char => {
          return {
            name: char.name,
            gender: char.gender,
            birthYear: char.birth,
            deathYear: char.death,
            race: char.race,
            favorite: false,
            movie: Movie.LordOfTheRings,
            comment: ''
          };
        });
      })
    );
  }
}
