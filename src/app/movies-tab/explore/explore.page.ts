import { Component, OnInit } from '@angular/core';
import { HideMenuService } from 'src/app/services/hide-menu.service';
import { MovieNotesService } from 'src/app/movie-notes.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NavController } from '@ionic/angular';
import { Subscription, catchError, forkJoin, map, of } from 'rxjs';
  import {jwtDecode} from 'jwt-decode';

interface NoteExplore {
  id: string | null;
  description: string;
  movieId: string;
  movieTitle: string;
  movieYear: string;
  movieImageUrl: string;
  userId: string | null;
  isNoteCreatedByCurrentUser: boolean;
  isFavorite: boolean;
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
  private dataSubscription!: Subscription ;

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
  }


ionViewWillEnter() {
  this.authService.userId.subscribe((userId) => {


    if (!userId) {

      return; 
    }
    const decodedToken: any = jwtDecode(userId);
    this.currentUserId = decodedToken.userId;

    this.dataSubscription = this.noteService.getNotes().subscribe((notesData) => {
      const notes1 = notesData.map((note) =>
        this.noteService.isFavorite(note.userId, this.currentUserId, note.movieId).pipe(
          map((isFav) => ({
            ...note,
            isNoteCreatedByCurrentUser: note.userId === this.currentUserId,
            isFavorite: isFav,
          })),
          catchError((error) => {
            // err
            return of({
              ...note,
              isNoteCreatedByCurrentUser: note.userId === this.currentUserId,
              isFavorite: false, 
            });
          })
        )
      );

      forkJoin(notes1).subscribe((notes) => {
        this.notes = notes;
        this.search();
        this.searchResults = [...this.notes];
      });
    });
  });
}

ngOnDestroy() {

  this.dataSubscription.unsubscribe();
}

}