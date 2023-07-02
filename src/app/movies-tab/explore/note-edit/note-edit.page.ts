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
    {id:'n1', description:'dobar', movieId:'m1',
    movie:{id:"m1", imageUrl:"https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjS3Ibuk-H_AhWpSPEDHWWfDt4Q1bUFegQIHBAA&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Famazon&usg=AOvVaw2CApNQHYDAcJlpsvFBIHVW&opi=89978449",
     title:"Lord of the rings", year:"2023."}, userId:'u1', isFavorite:false, isOnWatchlist:false };
  
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
                // Dodajte željenu logiku koja se izvršava prilikom klika na dugme "Cancel"
              },
            },
            {
              text: 'Edit',
              handler: () => {
                console.log('OK clicked');
                // Dodajte željenu logiku koja se izvršava prilikom klika na dugme "OK"
                // Pozovite metodu za submit forme ako je potrebno
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
