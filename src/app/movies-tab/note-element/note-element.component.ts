import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteExplore } from '../noteExplore.model';
import { MovieNotesService } from 'src/app/movie-notes.service';
import { AuthService } from 'src/app/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-note-element',
  templateUrl: './note-element.component.html',
  styleUrls: ['./note-element.component.scss'],
})
export class NoteElementComponent  implements OnInit {
@Input() note: NoteExplore = {id:"", description:"", movieId:"", userId:"", movieImageUrl: "",
movieTitle: "", movieYear:"", isNoteCreatedByCurrentUser: false, isFavorite:false}
currentUserId: string | null="";

  constructor(private noteService: MovieNotesService, private authService: AuthService) { }

  ngOnInit() {
  }

//   toggleFavoriteNote(){

//     this.authService.userId.subscribe((userId) => {
//       this.currentUserId = userId;
  
//       if (!userId) {
//         return; // No need to proceed if user is not authenticated
//       }
      
//       this.authService.userId.subscribe((userId) => {
//         this.currentUserId = userId;
//         if (!this.note.isFavorite) {
//       console.log("dodato u omiljene")
//       this.noteService.addFavoriteNote(this.currentUserId, this.note.id, this.note.description, this.note.movieId,
//         this.note.movieTitle, this.note.movieYear, this.note.movieImageUrl, this.note.userId);
//         this.note.isFavorite = true;
//       }
//      else {
//       let fId=null;
//       this.noteService.getFId(this.note.id, this.currentUserId).subscribe((favId)=>{
      
//         fId=favId;
//         if(fId===null){
//           return;
//         }

//         this.noteService.deleteFavoriteNote(fId, this.currentUserId).subscribe(() => {
//           this.note.isFavorite = false;
          
//           console.log("uklonjeno iz omiljenih")
//         });
//       })
      
//     }
//   })
//   })
// }


toggleFavoriteNote() {
  this.authService.userId.subscribe((userId) => {
    this.currentUserId = userId;

    if (!userId) {
      return;
    }

    if (!this.note.isFavorite) {
      console.log("Adding to favorites");
      this.noteService.addFavoriteNote(this.currentUserId, this.note.id, this.note.description, this.note.movieId,
                 this.note.movieTitle, this.note.movieYear, this.note.movieImageUrl, this.note.userId)
        .subscribe(() => {
          this.note.isFavorite = true;
        });
    } 
    else {
      let fId = null;
      this.noteService.getFId(this.note.id, this.currentUserId).subscribe((favId) => {
        fId = favId;
        if (fId === null) {
          return;
        }

        this.noteService.deleteFavoriteNote(fId, this.currentUserId)
          .subscribe(() => {
            this.note.isFavorite = false;
            console.log("Removed from favorites");
          });
      });
    }
  });
}


}
