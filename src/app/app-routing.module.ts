import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvidersModule } from './providers/providers.module';
import { FavoritesModule } from './favorites/favorites.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./providers/providers.module').then((m: { ProvidersModule: ProvidersModule }) => m.ProvidersModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then((m: { FavoritesModule: FavoritesModule }) => m.FavoritesModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
