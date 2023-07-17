import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from './movies-tab/note.model';
import { BehaviorSubject, map } from 'rxjs';

interface MovieData{
  id:string,
  title:string,
  year:string,
  imageUrl:string
}
interface NoteData{
  id:string,
  description:string
}

@Injectable({
  providedIn: 'root'
})
export class MovieNotesService {

  private _notes=new BehaviorSubject<Note[]>([]);
  constructor(private http: HttpClient) { }
  get notes(){
    return this._notes.asObservable();
  }

addNote(id:string, description:string, movieId:string, movieTitle:string, movieYear:string, movieImageUrl:string, userId:string){
  //provera da li movie vec postoji u bazi
  this.addMovie(movieId, movieTitle, movieYear, movieImageUrl);
  return this.http.post<{name:string}>('https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/movies.json',{
    id,
    description,
    movieId,
    userId
  });
}  
/*getNotes(){
  return this.http.get<{[key:string]:NoteData}>('https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/notes.json')
  .pipe( map((notesData)=>{
    const notes:Note[]=[];
    for(const key in notesData){
      if(notesData.hasOwnProprety(key)){
      notes.push({
        id:key,
        description:notesData[key].description,
        movie=null,

      });
    }
    }
     return notes;
  }),
  map(notes=>{
  this._notes.next(notes);
  }));
}*/

addMovie(id:string,  title:string, year:string, imageUrl:string){
  return this.http.post<{name:string}>('https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/movies.json',{
    id,
    title,
    year,
    imageUrl
  });
}
getMovies(){
  return this.http.get<{[key:string]:MovieData}>('https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/movies.json');
}

}
