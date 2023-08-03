import { Component, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { HideMenuService } from 'src/app/services/hide-menu.service';
import { MovieNotesService } from 'src/app/movie-notes.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: MovieNotesService, private menuService:HideMenuService) {}

  searchTerm: string = '';
  searchResults: Note[] = [];

  search() {
    if (this.searchTerm.trim() === '') {
      this.searchResults = this.notes;
    } else {
    this.searchResults = this.notes.filter((note: Note) =>
      note.movieTitle.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  ngOnInit() {
    this.menuService.setMenuHidden(false)

    this.noteService.notes.subscribe((notes) => {
      this.notes = notes;
      console.log(notes);
      this.searchResults = this.notes;
    })
    if (this.searchTerm.trim() === '') {
        this.searchResults = this.notes;
    }
  }

  ionViewWillEnter() {
    this.noteService.getNotes().subscribe((notesData) => {
      console.log(notesData);
      this.notes = notesData;
      this.searchResults = this.notes;
    });
  }
}
