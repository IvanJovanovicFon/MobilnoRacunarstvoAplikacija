import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import { NoteElementComponent } from '../note-element/note-element.component';
import { MovieElementComponent } from '../note-element/movie-element/movie-element.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule
  ],
  declarations: [ExplorePage, NoteElementComponent, MovieElementComponent]
})
export class ExplorePageModule {}
