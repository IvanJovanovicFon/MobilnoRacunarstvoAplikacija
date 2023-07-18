import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../movies-tab/movie-api.service';
import { Note } from '../movies-tab/note.model';
import { Movie } from '../movies-tab/movie.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../movies-tab/note.service';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage{
  searchTerm: string = '';
  searchResults: any[] = [];
  addForm: FormGroup = new FormGroup({})
  
  constructor(private movieApiService:MovieApiService, private noteService: NoteService) {
  }

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
  selectedMovieData: Movie | null = null;
  
  ngOnInit() {
    this.addForm=new FormGroup({
      selectedMoviedata:new FormControl(''),
      description:new FormControl('', Validators.required)
    });
  }

  onSelectMovie(movie: Movie) {
    this.selectedMovieData = movie;
    this.movies= [];
    this.searchResults = []
  }

  addNote(){
    
      //pravljenje nove beleske
    //this.noteService.addNote(note)
    //restartovanje forme
    }

}
