import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieApiService } from 'src/app/movies-tab/movie-api.service';
import { Movie } from 'src/app/movies-tab/movie.model';
import { NoteService } from 'src/app/movies-tab/note.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.page.html',
  styleUrls: ['./add-form.page.scss'],
})
export class AddFormPage implements OnInit {
  movies: Movie[]=[];

  constructor(private movieService:MovieApiService, private noteService: NoteService, public addForm: FormGroup) {
  }
  
  ngOnInit() {
    //this.movies=this.movieService.searchMovies("");
    this.addForm=new FormGroup({
      selectedMovie:new FormControl(''),
      description:new FormControl('', Validators.required)
    });
  }

  addNote(){
    
      //pravljenje nove beleske
    //this.noteService.addNote(note)
    //restartovanje forme
    }

  }


