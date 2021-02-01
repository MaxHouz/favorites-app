import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ProvidersService } from '../../providers/services/providers.service';
import { of } from 'rxjs';
import { loadStarWars, loadStarWarsFailed, loadStarWarsSuccess } from './star-wars.actions';
import { IAppState } from '../app.state.interface';
import { Store } from '@ngrx/store';
import { selectStarWarsPage } from './star-wars.selectors';

@Injectable()
export class StarWarsEffects {

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private providersService: ProvidersService,
  ) {
  }

  loadStarWars$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadStarWars),
      withLatestFrom(
        this.store.select(selectStarWarsPage)
      ),
      switchMap(([_, page]) => {
        return this.providersService.getStarWars(page).pipe(
          map(characters => loadStarWarsSuccess({ payload: { characters, page }})),
          catchError(() => of(loadStarWarsFailed()))
        );
      })
    )
  );
}
