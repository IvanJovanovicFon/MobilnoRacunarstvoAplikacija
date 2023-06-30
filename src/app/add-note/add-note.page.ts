import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../movies-tab/movie-api.service';
import { Note } from '../movies-tab/note.model';
import { Movie } from '../movies-tab/movie.model';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage{
  movies: Movie[] = [];

  constructor(private apiService: MovieApiService) {}

  searchTerm: string = '';
  searchResults: Movie[] = [];

  search() {
    if (this.searchTerm.trim() === '') {
      this.searchResults = this.movies;
    } else {
    this.searchResults = this.movies.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  ngOnInit() {

  }
}
