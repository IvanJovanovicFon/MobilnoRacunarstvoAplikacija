import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note.model';

@Component({
  selector: 'app-note-element',
  templateUrl: './note-element.component.html',
  styleUrls: ['./note-element.component.scss'],
})
export class NoteElementComponent  implements OnInit {
@Input() note: Note = {id:"n1", description:"srednji", isFavorite:false, isOnWatchlist:false, movieId:"m1", userId:"u1", movie:{id:"m1", imageUrl:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmovie&psig=AOvVaw2cxd-nn8bc2avDI0hjlmMX&ust=1687874816012000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCLjZo-eN4f8CFQAAAAAdAAAAABAE",
title:"Lord of the Rings", year:"2023."}}
  constructor() { }

  ngOnInit() {}

}
