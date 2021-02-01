import { ActionReducerMap } from '@ngrx/store';
import { starWarsReducer } from './star-wars/star-wars.reducer';
import { lordOfTheRingsReducer } from './lord-of-the-rings/lord-of-the-rings.reducer';
import { IAppState } from './app.state.interface';

export const reducers: ActionReducerMap<IAppState> = {
  starWars: starWarsReducer,
  lordOfTheRings: lordOfTheRingsReducer
};
