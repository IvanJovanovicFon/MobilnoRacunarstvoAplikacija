import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { NoteElementComponent } from './note-element.component';

import { RouterModule } from '@angular/router';




@NgModule({

  declarations: [NoteElementComponent],

  imports: [CommonModule, IonicModule, RouterModule],

  exports: [NoteElementComponent] 

})

export class NoteElementModule {}