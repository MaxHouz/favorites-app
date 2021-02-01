import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadLordOfTheRings,
  loadLordOfTheRingsFailed,
  loadLordOfTheRingsSuccess,
} from './lord-of-the-rings.actions';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ProvidersService } from '../../providers/services/providers.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../app.state.interface';
import { selectLordOfTheRingsPage } from './lord-of-the-rings.selectors';

@Injectable()
export class LordOfTheRingsEffects {

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private providersService: ProvidersService,
  ) {
  }

  loadLordOfTheRings = createEffect(
    () => this.actions$.pipe(
      ofType(loadLordOfTheRings),
      withLatestFrom(
        this.store.select(selectLordOfTheRingsPage)
      ),
      switchMap(([_, page]) => {
        return this.providersService.getLordOfTheRings(page).pipe(
          map(characters => loadLordOfTheRingsSuccess({ payload: { characters, page }})),
          catchError(() => of(loadLordOfTheRingsFailed))
        );
      })
    )
  );
}
