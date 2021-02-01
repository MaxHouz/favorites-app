import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { IGeneralCharacter, Movie } from '../../models/characters.interface';
import { updateStarWarsComment, updateStarWarsFavorites } from '../../../@store/star-wars/star-wars.actions';
import { updateLordOfTheRingsComment, updateLordOfTheRingsFavorites } from '../../../@store/lord-of-the-rings/lord-of-the-rings.actions';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../@store/app.state.interface';
import { Sort } from '@angular/material/sort';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-character-table',
  templateUrl: './character-table.component.html',
  styleUrls: ['./character-table.component.scss']
})
export class CharacterTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: IGeneralCharacter[];
  @Input() columns: { key: string, header: string }[];
  @Input() loadMoreHidden: boolean;
  @Input() isLoading: boolean;

  @Output() loadMore = new EventEmitter<void>();

  public columnKeys: string[] = [];
  public sortedData = null;
  public commentChange = new Subject<{ comment: string, character: IGeneralCharacter }>();

  private activeSort: Sort;
  private commentSub: Subscription;

  constructor(
    private store: Store<IAppState>
  ) { }

  public ngOnInit() {
    this.commentSub = this.commentChange.pipe(
      debounceTime(600),
      distinctUntilChanged()
    ).subscribe(({ character, comment }) => {
      if (character.movie === Movie.StarWars) {
        this.store.dispatch(updateStarWarsComment({ payload: { name: character.name, comment } }));
      } else {
        this.store.dispatch(updateLordOfTheRingsComment({ payload: { name: character.name, comment } }));
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.columns?.currentValue) {
      this.columnKeys = changes.columns.currentValue.map(({ key }) => key);
    }

    if (changes.data?.currentValue && this.activeSort) {
      this.onSortChange(this.activeSort);
    }
  }

  public ngOnDestroy() {
    this.commentSub?.unsubscribe();
    this.commentChange.complete();
  }

  public updateFavoritesValue(character: IGeneralCharacter): void {
    if (character.movie === Movie.StarWars) {
      this.store.dispatch(updateStarWarsFavorites({ payload: character.name }));
    } else {
      this.store.dispatch(updateLordOfTheRingsFavorites({ payload: character.name }));
    }
  }

  public removeComment(character: IGeneralCharacter): void {
    if (character.movie === Movie.StarWars) {
      this.store.dispatch(updateStarWarsComment({ payload: { name: character.name, comment: '' } }));
    } else {
      this.store.dispatch(updateLordOfTheRingsComment({ payload: { name: character.name, comment: '' } }));
    }
  }

  public onSortChange(sort: Sort): void {
    this.activeSort = sort;
    switch (sort.direction) {
      case 'asc':
        this.sortedData = [...this.data].sort((char1, char2) => {
          if (char1[sort.active] < char2[sort.active]) { return -1; }
          if (char1[sort.active] > char2[sort.active]) { return 1; }
          return 0;
        });
        break;
      case 'desc':
        this.sortedData = [...this.data].sort((char1, char2) => {
          if (char1[sort.active] > char2[sort.active]) { return -1; }
          if (char1[sort.active] < char2[sort.active]) { return 1; }
          return 0;
        });
        break;
      default:
        this.sortedData = null;
    }
  }
}
