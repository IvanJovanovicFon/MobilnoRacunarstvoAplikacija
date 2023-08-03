import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes:Note[] = [];
  //constructor() { }

  getNote(id: string): Note {
    const note = this.notes.find((n: Note) => n.id === id);
    if (!note) {
      throw new Error(`Note with ID ${id} not found.`);
    }
    return note;
  }

  getNotes():Note[] {
    return this.notes;
  }
  
}
