import { Component, OnInit } from '@angular/core';
import { HideMenuService } from 'src/app/services/hide-menu.service';
import { Note } from '../note.model';
import { MovieNotesService } from 'src/app/movie-notes.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NoteExplore } from '../noteExplore.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favnotes: NoteExplore[] = [];
  currentUserId: string | null = null;
  private dataSubscription!: Subscription;

constructor(
  private noteService: MovieNotesService,
  private menuService: HideMenuService,
  private authService: AuthService){}


ngOnInit(): void {
  this.menuService.setMenuHidden(false)
  console.log(this.menuService.getMenuHidden())
}

ionViewWillEnter() {
  console.log(111)
  this.authService.userId.subscribe((userId) => {
    this.currentUserId = userId;
    console.log(112)
    this.dataSubscription=this.noteService.getFavoriteNotes(this.currentUserId).subscribe((notesData) => {
      console.log(113)
      this.favnotes = notesData.map((note) => ({
        id:note.id,
        movieId:note.movieId,
        movieTitle:note.movieTitle,
        movieImageUrl:note.movieImageUrl,
        movieYear:note.movieYear,
        description: note.description,
        userId:note.userId,
        isNoteCreatedByCurrentUser: note.userId === this.currentUserId,
        isFavorite: true
      }));
      console.log(114)
      this.favnotes = [...this.favnotes]; 
    });
  });

  
}
ngOnDestroy() {
  console.log("ngOnDestroy fav")
  this.dataSubscription.unsubscribe();
}
}

