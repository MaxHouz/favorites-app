import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILordOfTheRingsCharacter, IStarWarsCharacter } from '../shared/models/characters.interface';
import {
  isLastLordOfTheRingsPage,
  isLordOfTheRingsLoading,
  selectLordOfTheRingsChars
} from '../@store/lord-of-the-rings/lord-of-the-rings.selectors';
import { isLastStarWarsPage, isStarWarsLoading, selectStarWarsChars } from '../@store/star-wars/star-wars.selectors';
import { IAppState } from '../@store/app.state.interface';
import { loadStarWars } from '../@store/star-wars/star-wars.actions';
import { loadLordOfTheRings } from '../@store/lord-of-the-rings/lord-of-the-rings.actions';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  public isLastStarWarsPage$: Observable<boolean>;
  public isStarWarsLoading$: Observable<boolean>;
  public starWarsCharacters$: Observable<IStarWarsCharacter[]>;
  public readonly starWarsColumns = [
    { key: 'favorite', header: '' },
    { key: 'name', header: 'Name' },
    { key: 'gender', header: 'Gender' },
    { key: 'birthYear', header: 'Birth Year' },
    { key: 'hairColor', header: 'Hair Color' },
    { key: 'comment', header: '' }
  ];

  public isLastLordOfTheRingsPage$: Observable<boolean>;
  public isLordOfTheRingsLoading$: Observable<boolean>;
  public lordOfTheRingsCharacters$: Observable<ILordOfTheRingsCharacter[]>;
  public readonly lordOfTheRingsColumns = [
    { key: 'favorite', header: '' },
    { key: 'name', header: 'Name' },
    { key: 'gender', header: 'Gender' },
    { key: 'birthYear', header: 'Birth Year' },
    { key: 'deathYear', header: 'Death Year' },
    { key: 'race', header: 'Race' },
    { key: 'comment', header: '' }
  ];

  constructor(
    private store: Store<IAppState>
  ) { }

  public ngOnInit(): void {
    this.isLastStarWarsPage$ = this.store.select(isLastStarWarsPage);
    this.isStarWarsLoading$ = this.store.select(isStarWarsLoading);
    this.starWarsCharacters$ = this.store.select(selectStarWarsChars);
    this.isLastLordOfTheRingsPage$ = this.store.select(isLastLordOfTheRingsPage);
    this.isLordOfTheRingsLoading$ = this.store.select(isLordOfTheRingsLoading);
    this.lordOfTheRingsCharacters$ = this.store.select(selectLordOfTheRingsChars);
  }

  public onLoadStarWars(): void {
    this.store.dispatch(loadStarWars());
  }

  public onLoadLordOfTheRings(): void {
    this.store.dispatch(loadLordOfTheRings());
  }
}
