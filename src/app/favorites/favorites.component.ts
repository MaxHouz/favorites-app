import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IGeneralCharacter } from '../shared/models/characters.interface';
import { Store } from '@ngrx/store';
import { selectFavorites } from '../@store/app.selectors';
import { IAppState } from '../@store/app.state.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public favoritesList$: Observable<IGeneralCharacter[]>;
  public readonly favoritesColumns = [
    { key: 'favorite', header: '' },
    { key: 'name', header: 'Name' },
    { key: 'gender', header: 'Gender' },
    { key: 'birthYear', header: 'Birth Year' },
    { key: 'movie', header: 'Movie' },
    { key: 'comment', header: '' }
  ];

  constructor(
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.favoritesList$ = this.store.select(selectFavorites);
  }

}
