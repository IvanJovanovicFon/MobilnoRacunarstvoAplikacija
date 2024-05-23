import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from './movies-tab/note.model';
import { BehaviorSubject, EMPTY, Observable, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { FavNote } from './movies-tab/favnote.model';

import { Subscription } from 'rxjs';


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
  providedIn: 'root',
})
export class MovieNotesService {
  private currentUserId: String | null = null;
  private _notes = new BehaviorSubject<Note[]>([]);
  private _favnotes = new BehaviorSubject<FavNote[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  get notes() {
    return this._notes.asObservable();
  }
  get favnotes() {
    return this._favnotes.asObservable();
  }

  addNote(
    id: string,
    description: string,
    movieId: string,
    movieTitle: string,
    movieYear: string,
    movieImageUrl: string,
    userId: string | null
  ): Subscription {
    return this.authService.userId
      .pipe(
        take(1),
        switchMap((userId) => {
          if (!userId) {
            console.log('User does not exist');
            return EMPTY;
          }
          let newNote = new Note(
            null,
            description,
            movieId,
            movieTitle,
            movieYear,
            movieImageUrl,
            userId
          );
          return this.authService.token.pipe(
            take(1),
            switchMap((token) => {
              const headers = new HttpHeaders({
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              });
              return this.http.post<{ name: string }>(
                `http://localhost:3000/addNote`,
                newNote,
                { headers }
              );
            }),
            map((resData) => {
              const generatedId = resData.name;
              newNote.id = generatedId;
              return newNote;
            })
          );
        }),
        switchMap((newNote) => {
          return this.notes.pipe(
            take(1),
            map((notes) => [...notes, newNote])
          );
        })
      )
      .subscribe({
        next: (updatedNotes) => {
          this._notes.next(updatedNotes);
        },
        error: (error) => {
          console.log('Error in ADDNOTE');
        },
      });
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
            const headers = new HttpHeaders({
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            });
            console.log('nova nota: ', newNote)
            return this.http
              .post<{ name: string }>(
                `http://localhost:3000/addFavoriteNote`,
                newNote,
                { headers }
              )
              .pipe(
                switchMap((resData) => {
                  const generatedId = resData.name;
                  newNote.fId = generatedId;
                  return this.favnotes;
                }),
                take(1),
                tap((favnotes) => {
                  this._favnotes.next(favnotes.concat(newNote));
                })
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
        console.log('token:', token);
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });
        return this.http.get<{ [key: string]: NoteData }>(
          `http://localhost:3000/getNotes`,
          { headers }
        );
      }),
      map((notesData: any) => {
        const notes: Note[] = [];
        for (const key in notesData) {
          if (notesData.hasOwnProperty(key)) {
            notes.push(
              new Note(
                key,
                notesData[key].description as string,
                notesData[key].movieId as string,
                notesData[key].movieTitle as string,
                notesData[key].movieYear as string,
                notesData[key].movieImageUrl as string,
                notesData[key].userId as string
              )
            );
          }
        }
        return notes;
      }),
      tap((notes: Note[]) => {
        this._notes.next(notes);
      })
    );
  }

  getFavoriteNotes(savedById: string | null) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });
        return this.http.get<{ [key: string]: FavNoteData }>(
          `http://localhost:3000/getFavoriteNotes`,
          { headers }
        );
      }),
      map((favNotesData: any) => {
        const favnotes: FavNote[] = [];
        for (const key in favNotesData) {
          if (favNotesData.hasOwnProperty(key)) {
            favnotes.push(
              new FavNote(
                key,
                favNotesData[key].id as string,
                favNotesData[key].description as string,
                favNotesData[key].movieId as string,
                favNotesData[key].movieTitle as string,
                favNotesData[key].movieYear as string,
                favNotesData[key].movieImageUrl as string,
                favNotesData[key].userId as string,
                favNotesData[key].savedById as string
              )
            );
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
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });
        console.log('deleteid: ', id)
        return this.http
          .delete(`http://localhost:3000/deleteNote/${id}`, { headers })
          .pipe(
            switchMap(() => this.getNotes()),
            take(1),
            tap((notes) => {
              this._notes.next(notes.filter((n) => n.id !== id));
            })
          );
      })
    );
  }

  getFId(id: string | null, savedById: string | null, userId: string | null) {
    return this._favnotes.pipe(
      take(1),
      map((favNotes) => {
        console.log('fav:  ', favNotes)
        const targetNote = favNotes.find(
          (note) => note.savedById === savedById && note.movieId === id && note.userId === userId
        );

        if (targetNote) {
          console.log('Beleska JESTE pronadjena');
          const fId = targetNote.fId;
          return fId;
        } else {
          console.log('Beleška NIJE pronađena.');
          return null;
        }
      })
    );
  }

  deleteFavoriteNote(fId: string | null, savedById: string | null) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });
        return this.http
          .delete(`http://localhost:3000/deleteFavoriteNote/${fId}`, {
            headers,
          })
          .pipe(
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
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });
        const url = `http://localhost:3000/editNote/${id}`;
        return this.http
          .put(
            url,
            {
              description,
              movieId,
              movieTitle,
              movieYear,
              movieImageUrl,
              userId,
            },
            { headers }
          )
          .pipe(
            tap((response) => {
              console.log('PUT request response:', response);
            })
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
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });
        return this.http.get<NoteData>(`http://localhost:3000/getNote/${id}`, {
          headers,
        });
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

  isFavorite(userId:  string | null, savedById: string | null, id: string | null) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });
        return this.http
          .get<{ isFavorite: boolean }>(
            `http://localhost:3000/isFavorite?userId=${userId}&savedById=${savedById}&id=${id}`,
            { headers }
          )
          .pipe(
            map((resData) => {
              return resData.isFavorite;
            })
          );
      })
    );
  }
}
