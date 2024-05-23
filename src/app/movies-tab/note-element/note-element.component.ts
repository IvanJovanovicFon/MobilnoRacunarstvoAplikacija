import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteExplore } from '../noteExplore.model';
import { MovieNotesService } from 'src/app/movie-notes.service';
import { AuthService } from 'src/app/auth/auth.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-note-element',
  templateUrl: './note-element.component.html',
  styleUrls: ['./note-element.component.scss'],
})
export class NoteElementComponent  implements OnInit {
@Input() note: NoteExplore = {id:"", description:"", movieId:"", userId:"", movieImageUrl: "",
movieTitle: "", movieYear:"", isNoteCreatedByCurrentUser: false, isFavorite:false}
currentUserId: string | null="";

  constructor(private noteService: MovieNotesService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  openNoteElement(movieId: string) {
    console.log('Opening note element for movie:', movieId);
    this.router.navigate(['/movie-notes', 'tabs', 'explore', movieId]);
  }


toggleFavoriteNote() {
  this.authService.userId.pipe(
    take(1),
    switchMap(userId => {
      if (!userId) {
        return EMPTY; 
      }

      this.currentUserId = userId;

      if (!this.note.isFavorite) {
        return this.noteService.addFavoriteNote(this.currentUserId, this.note.id, this.note.description, this.note.movieId,
                   this.note.movieTitle, this.note.movieYear, this.note.movieImageUrl, this.note.userId);
      } else {
        return this.noteService.getFId(this.note.id, this.currentUserId).pipe(
          switchMap(favId => {
            if (favId === null) {
              return EMPTY; // No need to proceed if favorite note ID is not found
            }
            return this.noteService.deleteFavoriteNote(favId, this.currentUserId);
          })
        );
      }
    })
  ).subscribe(() => {
    this.note.isFavorite = !this.note.isFavorite;
    console.log("Toggle executed");
  });
}



}
