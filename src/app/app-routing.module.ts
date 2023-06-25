import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'movie-notes/tabs/explore',
    pathMatch:'full'
  },
  {
    path: 'movie-notes',
    loadChildren: () => import('./movies-tab/movies-tab.module').then( m => m.MoviesTabPageModule)
  },
  {
    path: 'explore',
    loadChildren:()=>import('./movies-tab/movies-tab.module').then( m => m.MoviesTabPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./movies-tab/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'add-note',
    loadChildren: () => import('./add-note/add-note.module').then( m => m.AddNotePageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'watch-list',
    loadChildren: () => import('./movies-tab/watch-list/watch-list.module').then( m => m.WatchListPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
