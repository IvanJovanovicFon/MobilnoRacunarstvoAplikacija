import { Component, OnInit } from '@angular/core';
import { Note } from '../../note.model';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../../note.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.page.html',
  styleUrls: ['./note-edit.page.scss'],
})
export class NoteEditPage implements OnInit {
  note: Note = 
    {id:'n1', description:'dobar', movieId:'m1',
    movie:{id:"m1", imageUrl:"https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjS3Ibuk-H_AhWpSPEDHWWfDt4Q1bUFegQIHBAA&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Famazon&usg=AOvVaw2CApNQHYDAcJlpsvFBIHVW&opi=89978449",
     title:"Lord of the rings", year:"2023."}, userId:'u1', isFavorite:false, isOnWatchlist:false };

     constructor(private route:ActivatedRoute, private notesService: NoteService) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(paramMap =>{
    //   this.note = this.notesService.getNote(paramMap.get('noteId'))
    // })
  }



}
