import { Injectable } from '@angular/core';
import axios, { Axios, AxiosInstance, AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
private baseApiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '1bcf37038ff8a6943f6f5443ede3fb6f'; 

  constructor() { }

  async searchMovies(query: string) {
    const url = `${this.baseApiUrl}/search/movie`;
    const params = {
      query: query,
      include_adult: 'false',
      language: 'en-US',
      page: '1',
      api_key: this.apiKey
    };

    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      throw new Error;
    }
  }
};
  