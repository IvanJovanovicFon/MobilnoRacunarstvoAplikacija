import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplorePage } from './explore.page';

const routes: Routes = [
  {
    path: '',
    component: ExplorePage
  },
  {
    path: ':noteId',
    loadChildren: () => import('./note-edit/note-edit.module').then( m => m.NoteEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorePageRoutingModule {}
