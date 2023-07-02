import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNotePage } from './add-note.page';

const routes: Routes = [
  {
    path: '',
    component: AddNotePage
  },
  {
    path: 'add-form',
    loadChildren: () => import('./add-form/add-form.module').then( m => m.AddFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNotePageRoutingModule {}
