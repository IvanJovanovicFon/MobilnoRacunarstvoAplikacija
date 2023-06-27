import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes: Note[] = [
    {id:'n1', description:'dobar',movieId:'m1',
    movie:{id:"m1", imageUrl:"https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjS3Ibuk-H_AhWpSPEDHWWfDt4Q1bUFegQIHBAA&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Famazon&usg=AOvVaw2CApNQHYDAcJlpsvFBIHVW&opi=89978449",
     title:"Lord of the rings", year:"2023."}, userId:'u1', isFavorite:false, isOnWatchlist:false },
  {id:'n2', description:'onako', movieId:'m2',
  movie:{id:"m2", imageUrl:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmovie&psig=AOvVaw2cxd-nn8bc2avDI0hjlmMX&ust=1687874816012000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCLjZo-eN4f8CFQAAAAAdAAAAABAE",
     title:"Pans Labirint", year:"2024."}, userId:'u2', isFavorite:true, isOnWatchlist:true }
  ];

  //constructor() { }

  getNote(id: string){
    return this.notes.find((n:Note)=> n.id === id);
  }
}
