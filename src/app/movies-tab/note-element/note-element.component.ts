import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteExplore } from '../noteExplore.model';
import { MovieNotesService } from 'src/app/movie-notes.service';

@Component({
  selector: 'app-note-element',
  templateUrl: './note-element.component.html',
  styleUrls: ['./note-element.component.scss'],
})
export class NoteElementComponent  implements OnInit {
@Input() note: NoteExplore = {id:"", description:"", movieId:"", userId:"", movieImageUrl: "",
movieTitle: "", movieYear:"", isNoteCreatedByCurrentUser: false}

  constructor(private noteService: MovieNotesService) { }

  ngOnInit() {
    // this.noteService.getNote().subscribe((notesData) => {
    //   this.note = notesData.map((note) => ({
    //     ...note,
    //     isNoteCreatedByCurrentUser: note.userId === this.currentUserId,
    //   }));
  }

}
