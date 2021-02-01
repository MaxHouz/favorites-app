import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isFavoritesActive$: Observable<boolean>;

  constructor(
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.isFavoritesActive$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url.includes('favorites'))
    );
  }

  public openProviders(): void {
    this.router.navigate(['']);
  }

  public openFavorites(): void {
    this.router.navigate(['favorites']);
  }
}
