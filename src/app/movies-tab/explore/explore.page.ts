import { Component, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService) {}

  searchTerm: string = '';
  searchResults: Note[] = [];

  search() {
    if (this.searchTerm.trim() === '') {
      this.searchResults = this.notes;
    } else {
    this.searchResults = this.notes.filter((note: Note) =>
      note.movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  ngOnInit() {
   this.notes= this.noteService.getNotes();
   if (this.searchTerm.trim() === '') {
    this.searchResults = this.notes;
   }
  }
}
