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
  
    this.authService.token.pipe(
      take(1),
      switchMap((token) => {
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
          `https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/movies.json?auth=${token}`,
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
    ).subscribe();
  }
   
getNotes() {
  return this.authService.token.pipe(
    take(1),
    switchMap((token) => {
      return this.http.get<{ [key: string]: NoteData }>(
        `https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/movies.json?auth=${token}`
      );
    }),
    map((notesData: any) => {
      const notes: Note[] = [];
      for (const key in notesData) {
        if (notesData.hasOwnProperty(key)) {
          notes.push(new Note(
            key,
            notesData[key].description as string,
            notesData[key].movieId as string,
            notesData[key].movieTitle as string,
            notesData[key].movieYear as string,
            notesData[key].movieImageUrl as string,
            notesData[key].userId as string
          ));
        }
      }
      return notes;
    }),
    tap((notes: Note[]) => {
      this._notes.next(notes);
    })
  );
}


deleteNote(id: string | null) {//fali samo da se ubaci da svako svooj samo moze da obrise
  console.log("delete")
  return this.authService.token.pipe(
    take(1),
    switchMap((token) => {
      console.log("ne ulazzi u switchmap, ne znam zasto")
      return this.http.delete(
        `https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/movies/${id}.json?auth=${token}`
      ).pipe(
        switchMap(() => this.getNotes()),
        take(1),
        tap((notes) => {
          this._notes.next(notes.filter((n) => n.id !== id));
        })
      );
    })
  );
}


editNote(// ne radi lepo
  id: string | null,
  description: string,
  movieId: string,
  movieTitle: string,
  movieYear: string,
  movieImageUrl: string,
  userId: string | null
) {
  return this.authService.token.pipe(
    take(1),
    switchMap((token) => {
      console.log('Token:', token);
      const url = `https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/movies/${id}.json?auth=${token}`;

      return this.http.put(url, { description, userId }).pipe(
        tap((response) => {
          console.log('PUT request response:', response);
        }),
      );
    }),
    switchMap(() => {
      return this.getNotes();
    }),
    take(1),
    tap((notes) => {
      console.log('Updating notes with edited note:', id);

      const updateNoteIndex = notes.findIndex((n) => n.id === id);
      const updatedNotes = [...notes];
      updatedNotes[updateNoteIndex] = new Note(
        id,
        description,
        movieId,
        movieTitle,
        movieYear,
        movieImageUrl,
        userId
      );
      this._notes.next(updatedNotes);
    })
  );
}



getNote(id: string | null) {
  return this.authService.token.pipe(
    take(1),
    switchMap((token) => {
      return this.http.get<NoteData>(
        `https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/movies/${id}.json?auth=${token}`
      );
    }),
    map((resData) => {
      return new Note(
        id,
        resData.description,
        resData.movieId,
        resData.movieTitle,
        resData.movieYear,
        resData.movieImageUrl,
        resData.userId
      );
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
