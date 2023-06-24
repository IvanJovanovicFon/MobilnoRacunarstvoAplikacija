import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieNotesPageRoutingModule } from './movie-notes-routing.module';

import { MovieNotesPage } from './movie-notes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieNotesPageRoutingModule
  ],
  declarations: [MovieNotesPage]
})
export class MoviesTabPageModule {}
