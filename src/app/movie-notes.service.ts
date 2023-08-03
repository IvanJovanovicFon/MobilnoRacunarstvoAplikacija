import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from './movies-tab/note.model';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from './auth/auth.service';

interface MovieData{
  id:string,
  title:string,
  year:string,
  imageUrl:string
}
interface NoteData{
  id:string,
  description:string
  movieId:string,
  movieTitle:string,
  movieYear:string,
  movieImageUrl:string,
  userId:string
}

@Injectable({
  providedIn: 'root'
})
export class MovieNotesService {

  private _notes=new BehaviorSubject<Note[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  get notes(){
    return this._notes.asObservable();
  }

addNote(
  id: string,
  description: string,
  movieId: string,
  movieTitle: string,
  movieYear: string,
  movieImageUrl: string,
  userId: string
) {
  let generatedId: string;
  let newNote: Note;

  return this.authService.userId
    .pipe(
      take(1),
      switchMap((userId) => {
        newNote = new Note(
          null,
          description,
          movieId,
          movieTitle,
          movieYear,
          movieImageUrl,
          userId
        );
        return this.http.post<{ name: string }>(
          'https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
          newNote
        );
      }),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.notes;
      }),
      take(1),
      tap((notes) => {
        newNote.id = generatedId;
        this._notes.next(notes.concat(newNote));
      })
      )
      .subscribe();
      console.log("Uspesno dodat film");
}


getNotes() {
  return this.http.get<{ [key: string]: NoteData }>(
    'https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/notes.json'
  ).pipe(
    map((notesData) => {
      const notes: Note[] = [];
      for (const key in notesData) {
        if (notesData.hasOwnProperty(key)) {
          notes.push(new Note(
            key,
            notesData[key].description,
            notesData[key].movieId,
            notesData[key].movieTitle,
            notesData[key].movieYear,
            notesData[key].movieImageUrl,
            notesData[key].userId
          ));
        }
      }
      return notes;
    }),
    tap(notes => {
      this._notes.next(notes);
    })
  );
}

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
