import { Note } from '../../note.model';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../../note.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonHeader } from '@ionic/angular';
import { HideMenuService } from 'src/app/services/hide-menu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.page.html',
  styleUrls: ['./note-edit.page.scss'],
})
export class NoteEditPage implements OnInit, OnDestroy {
  note: Note = 
  {id:"n1", description:"srednji", movieId:"m1", userId:"u1", movieImageUrl: "https://upload.wikimedia.org/wikipedia/sr/c/cd/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring.jpg",
  movieTitle: "Lord of the rings", movieYear:"1993"}
  
  editForm: FormGroup = new FormGroup({})

     constructor(private route:ActivatedRoute, private notesService: NoteService, private hideMenuServie: HideMenuService, private alertController:AlertController) { }

     ngOnInit(): void {
       this.HideMenu(true);
       this.editForm=new FormGroup({
        description:new FormControl(this.note.description, Validators.required)
      });
      }
      editNote(){

      }
      async showAlert() {
        const alert = await this.alertController.create({
          header: 'Edit note',
          message: 'Do you want to confirm edit?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Cancel clicked');

              },
            },
            {
              text: 'Edit',
              handler: () => {
                console.log('OK clicked');

                this.editNote();
              },
            },
          ],
        });
    
        await alert.present();
      }
      ionViewDidEnter(){
        this.HideMenu(true);
      }
      
      ngOnDestroy(): void {
        this.HideMenu(false)
      }
      ionViewWillLeave(){
        this.HideMenu(false)
      }
     
     HideMenu(b: boolean): void {
       return this.hideMenuServie.setMenuHidden(b);
     }

    //  ngOnInit() {
    //   this.route.paramMap.subscribe(paramMap => {
    //     const noteId = paramMap.get('noteId');
    //     if (noteId) {
    //        this.note = this.notesService.getNote(noteId);
    //     }
    //   });
    // }
    



}
