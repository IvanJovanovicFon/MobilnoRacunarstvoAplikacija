import { Component, OnInit } from '@angular/core';
import { HideMenuService } from 'src/app/services/hide-menu.service';
import { MovieNotesService } from 'src/app/movie-notes.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NavController } from '@ionic/angular';

interface NoteExplore {
  id: string | null;
  description: string;
  movieId: string;
  movieTitle: string;
  movieYear: string;
  movieImageUrl: string;
  userId: string | null;
  isNoteCreatedByCurrentUser: boolean;
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  notes: NoteExplore[] = [];
  currentUserId: string | null = null;

  constructor(
    private noteService: MovieNotesService,
    private menuService: HideMenuService,
    private authService: AuthService
  ) {}

  searchTerm: string = '';
  searchResults: NoteExplore[] = [];

  search() {
    if (this.searchTerm.trim() === '') {
      this.searchResults = this.notes;
    } else {
      this.searchResults = this.notes.filter((note: NoteExplore) =>
        note.movieTitle.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  ngOnInit() {
    this.menuService.setMenuHidden(false);
    console.log(1133)
  }

  ionViewDidLoad(){
    console.log(223)
  }
  ionViewDidEnter(){
    console.log(223)
  }

  ionViewWillEnter() {///nece da radi, a radilo je do malopre
    console.log(111)
    this.authService.userId.subscribe((userId) => {
      this.currentUserId = userId;
      
      this.noteService.getNotes().subscribe((notesData) => {
        this.notes = notesData.map((note) => ({
          ...note,
          isNoteCreatedByCurrentUser: note.userId === this.currentUserId,
        }));
        
        this.search(); 
        this.searchResults = [...this.notes]; 
      });
    });
  }
}
