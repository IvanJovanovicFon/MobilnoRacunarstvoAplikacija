import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from './movies-tab/note.model';
import { BehaviorSubject, EMPTY, Observable, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { FavNote } from './movies-tab/favnote.model';


interface NoteData{
  id:string,
  description:string
  movieId:string,
  movieTitle:string,
  movieYear:string,
  movieImageUrl:string,
  userId:string
}
interface FavNoteData{
  fId:string,
  id:string,
  description:string
  movieId:string,
  movieTitle:string,
  movieYear:string,
  movieImageUrl:string,
  userId:string,
  savedById:string,
}


@Injectable({
  providedIn: 'root'
})
export class MovieNotesService {
  private currentUserId: String|null = null;
  private _notes=new BehaviorSubject<Note[]>([]);
  private _favnotes=new BehaviorSubject<FavNote[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  get notes(){
    return this._notes.asObservable();
  }
  get favnotes(){
    return this._favnotes.asObservable();
  }

addNote(
    id: string,
    description: string,
    movieId: string,
    movieTitle: string,
    movieYear: string,
    movieImageUrl: string,
    userId: string |null
  ) {
    this.authService.userId.subscribe((userId) => {
      this.currentUserId = userId;
  
      if (!userId) {
        return; // No need to proceed if user is not authenticated
      }
    let generatedId: string;
    let newNote: Note
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
    })
  }

  addFavoriteNote(
    savedById: string | null,
    id: string | null,
    description: string,
    movieId: string,
    movieTitle: string,
    movieYear: string,
    movieImageUrl: string,
    userId: string | null
  ): Observable<any> {
    const newNote: FavNote = new FavNote(
      null,
      id,
      description,
      movieId,
      movieTitle,
      movieYear,
      movieImageUrl,
      userId,
      savedById
    );
  
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        this.currentUserId = userId;
  
        if (!userId) {
          return EMPTY;
        }
  
        return this.authService.token.pipe(
          take(1),
          switchMap((token) => {
            return this.http.post<{ name: string }>(
              `https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/favorites.json?auth=${token}`,
              newNote
            ).pipe(
              switchMap((resData) => {
                const generatedId = resData.name;
                newNote.fId = generatedId;
                return this.favnotes;
              }),
              take(1),
              tap((favnotes) => {
                this._favnotes.next(favnotes.concat(newNote));
              }
              )
            );
          })
        );
      })
    );
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

getFavoriteNotes(savedById:string | null) {
  return this.authService.token.pipe(
    take(1),
    switchMap((token) => {
      return this.http.get<{ [key: string]: FavNoteData }>(
        `https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/favorites.json?auth=${token}&orderBy="savedById"&equalTo="${savedById}"`
      );
    }),
    map((favNotesData: any) => {
      const favnotes: FavNote[] = [];
      for (const key in favNotesData) {
        if (favNotesData.hasOwnProperty(key)) {
          favnotes.push(new FavNote(
            key,
            favNotesData[key].id as string,
            favNotesData[key].description as string,
            favNotesData[key].movieId as string,
            favNotesData[key].movieTitle as string,
            favNotesData[key].movieYear as string,
            favNotesData[key].movieImageUrl as string,
            favNotesData[key].userId as string,
            favNotesData[key].savedById as string
          ));
        }
      }
      return favnotes;
    }),
    tap((favnotes: FavNote[]) => {
      this._favnotes.next(favnotes);
    })
  );
}

deleteNote(id: string | null) {
  return this.authService.token.pipe(
    take(1),
    switchMap((token) => {
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

getFId(id: string | null, savedById: string | null) {
  return this._favnotes.pipe(
    map((favNotes) => {
      const targetNote = favNotes.find((note) => note.savedById === savedById && note.id === id);

      if (targetNote) {
        console.log('Beleska je pronadjena')
        const fId = targetNote.fId;
        return fId;
      } else {
        console.log('Beleška nije pronađena.');
        return null;
      }
    })
  );
}

deleteFavoriteNote(fId: string | null, savedById:string | null) {
  return this.authService.token.pipe(
    take(1),
    switchMap((token) => {
      return this.http.delete(
        `https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/favorites/${fId}.json?auth=${token}`
      ).pipe(
        switchMap(() => this.getFavoriteNotes(savedById)),
        take(1),
        tap((favnotes) => {
          this._favnotes.next(favnotes.filter((fn) => fn.fId !== fId));
        })
      );
    })
  );
}

editNote(
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
      const url = `https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/movies/${id}.json?auth=${token}`;
      return this.http.put(url, { id, description, movieId, movieTitle, movieYear, movieImageUrl, userId }).pipe(
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

isFavorite(savedById:string | null, id: string | null){
  return this.authService.token.pipe(
    take(1),
    switchMap((token) => {
      return this.http
        .get<{ [key: string]: NoteData }>(
          `https://movie-notes-app-6f66d-default-rtdb.europe-west1.firebasedatabase.app/favorites.json?auth=${token}&orderBy="savedById"&equalTo="${savedById}"`
        )
        .pipe(
          map((resData) => {
            const favorites = Object.values(resData);
            const matchingFavorite = favorites.find(fav => fav.id === id);
            return !!matchingFavorite;
          })
        );
    })
  );
}

}
