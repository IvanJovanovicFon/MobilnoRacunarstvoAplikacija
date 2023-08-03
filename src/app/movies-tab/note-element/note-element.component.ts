import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note.model';

@Component({
  selector: 'app-note-element',
  templateUrl: './note-element.component.html',
  styleUrls: ['./note-element.component.scss'],
})
export class NoteElementComponent  implements OnInit {
@Input() note: Note = {id:"n1", description:"srednji", movieId:"m1", userId:"u1", movieImageUrl: "https://upload.wikimedia.org/wikipedia/sr/c/cd/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring.jpg",
movieTitle: "Lord of the rings", movieYear:"1993"}
  constructor() { }

  ngOnInit() {}

}
