import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../movie-api.service';
import { Movie } from '../movie.model';
import { AxiosResponse } from 'axios';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {
  searchTerm: string = '';
  searchResults: any[] = [];

  constructor(private movieApiService: MovieApiService) {}
  

  async search() {
    try {
      if (this.searchTerm.trim() !== '') {
        const response = await this.movieApiService.searchMovies(this.searchTerm);
        this.searchResults = response.results;
        const movies: Movie[] = this.searchResults.map((result: any) => ({
          id: result.id,
          title: result.title,
          year:result.release_date,
          imageUrl: result.poster_path
        }));
        console.log(movies); 
      } else {
        this.searchResults = [];
      }
    } catch (error) {
      console.error(error);
    }
  }
}


