import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MovieNotesPage } from './movie-notes.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MovieNotesPage,
    children:[
      {
        path: 'explore',
        loadChildren: () => import('./explore/explore.module').then( m => m.ExplorePageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('./favorites/favorites.module').then( m => m.FavoritesPageModule)
      },
      {
        path: 'watch-list',
        loadChildren: () => import('./watch-list/watch-list.module').then( m => m.WatchListPageModule)
      },
      {
        path: '',
        redirectTo:  'movie-notes/tabs/explore',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo:  'movie-notes/tabs/explore',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieNotesPageRoutingModule {}
