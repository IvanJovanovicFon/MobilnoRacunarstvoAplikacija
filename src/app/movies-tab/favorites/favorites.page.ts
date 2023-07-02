import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../movie-api.service';
import { Movie } from '../movie.model';
import { AxiosResponse } from 'axios';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoteService } from '../note.service';
import { HideMenuService } from 'src/app/services/hide-menu.service';
import { Note } from '../note.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favoriteNotes: Note[]=[];
constructor(private menuService:HideMenuService){}

ngOnInit(): void {
  this.menuService.setMenuHidden(false)
  console.log(this.menuService.getMenuHidden())
}

}


