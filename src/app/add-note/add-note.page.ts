import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../movies-tab/movie-api.service';
import { Note } from '../movies-tab/note.model';
import { Movie } from '../Movie.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieNotesService } from '../movie-notes.service';
import { AuthService } from '../auth/auth.service';
import { EMPTY, map, switchMap, take ,mergeMap, of, catchError, Observable} from 'rxjs';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage{
  searchTerm: string = '';
  searchResults: any[] = [];
  addForm: FormGroup = new FormGroup({})
  formSubmitted = false;
  currentUserId:String|null = null;


  constructor(private movieApiService:MovieApiService, 
    private noteService: MovieNotesService, 
    private authService: AuthService) {}

  async search() {
    try {
      if (this.searchTerm.trim() !== '') {
        const response = await this.movieApiService.searchMovies(this.searchTerm);
        response.results.forEach((r:any) => {
          r.poster_path="https://image.tmdb.org/t/p/original" + r.poster_path
        });
        this.searchResults = response.results;
        const movies: Movie[] = this.searchResults.map((result: any) => ({
          id: result.id,
          title: result.title,
          year:result.release_date,
          imageUrl: result.poster_path
        }));
      } else {
        this.searchResults = [];
      }
    } catch (error) {
      console.error(error);
    }
  }

  movies: Movie[]=[];
  selectedMovieData: any | null =  null;
  
  ngOnInit() {
    this.addForm=new FormGroup({
      selectedMovieData:new FormControl(''),
      description:new FormControl('', Validators.required)
    });
  }

  onSelectMovie(movie: any) {
    if (movie) {
      this.selectedMovieData = movie;
      this.movies = [];
      this.searchResults = [];
    }
  }


  onAddNote() {
    const description = this.addForm.get('description')!.value;
    const selectedMovie = this.selectedMovieData;
    const year = selectedMovie.release_date.split("-")[0];

      
      this.authService.userId.pipe(
        take(1),
        map((userId) => {
          const newNote: Note = {
            id: '',
            description: description,
            movieId: selectedMovie.id,
            movieTitle: selectedMovie.title,
            movieYear: year,
            movieImageUrl: selectedMovie.poster_path,
            userId: userId
          };
          return this.noteService.addNote(
            "", 
            newNote.description, 
            newNote.movieId,
            newNote.movieTitle, 
            newNote.movieYear, 
            newNote.movieImageUrl, 
            userId
            );
          })
          ).subscribe(() => {
            this.clearFormFields();
         
        });
  }
  
  
clearFormFields() {
  this.addForm.patchValue({
    selectedMoviedata: '',
    description: ''
  });
  this.selectedMovieData = null;
  this.searchTerm = "";
  this.formSubmitted = true;
}

}
