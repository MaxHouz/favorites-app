import { Component, OnInit } from '@angular/core';
import { IAppState } from './@store/app.state.interface';
import { Store } from '@ngrx/store';
import { loadStarWars } from './@store/star-wars/star-wars.actions';
import { loadLordOfTheRings } from './@store/lord-of-the-rings/lord-of-the-rings.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<IAppState>
  ) {
  }

  public ngOnInit() {
    this.store.dispatch(loadStarWars());
    this.store.dispatch(loadLordOfTheRings());
  }
}
