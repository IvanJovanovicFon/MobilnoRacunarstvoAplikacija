import { Note } from '../../note.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../note.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonHeader, LoadingController, NavController } from '@ionic/angular';
import { HideMenuService } from 'src/app/services/hide-menu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieNotesPage } from '../../movie-notes.page';
import { MovieNotesService } from 'src/app/movie-notes.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.page.html',
  styleUrls: ['./note-edit.page.scss'],
})

export class NoteEditPage implements OnInit {
  note: Note = {
    id: '',
    description: '',
    movieId: '',
    userId: '',
    movieImageUrl: '',
    movieTitle: '',
    movieYear: '',
  };
  isLoading = false;
  editForm: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private notesService: MovieNotesService,
    private navCtrl: NavController,
    private hideMenuServie: HideMenuService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.HideMenu(true);
    this.editForm = new FormGroup({
      description: new FormControl(this.note?.description, Validators.required),
    });

    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('noteId')) {
        this.navCtrl.navigateBack('/movie-notes/tabs/explore');
        return;
      }

      this.isLoading = true;
      const noteId = paramMap.get('noteId');

      this.notesService.getNote(noteId).subscribe(
        (note: Note) => {
          this.note = note;
          this.editForm.patchValue({ description: note.description });
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching the note:', error);
          this.isLoading = false;
        }
      );
    });
  }



  async onEditNote() {
    const alert = await this.alertController.create({
      header: 'Edit note',
      message: 'Do you want to confirm edit?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Yes',
          handler: async () => {
            const editSubscription = this.notesService.editNote(
              this.note.id,
              this.editForm.value.description,
              this.note.movieId,
              this.note.movieTitle,
              this.note.movieYear,
              this.note.movieImageUrl,
              this.note.userId
            ).subscribe(
              () => {
                console.log('Note edited successfully');
                editSubscription.unsubscribe();
                this.router.navigate(['/movie-notes/tabs/explore']);
              },
              (error) => {
                console.error('Error editing note:', error);
                editSubscription.unsubscribe();
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }
  

  onDeleteNote() {
    this.notesService.deleteNote(this.note.id).subscribe(() => {
      console.log('Note deleted successfully');
      this.router.navigate(['/movie-notes/tabs/explore']);
    }, (error) => {
      console.error('Error deleting note:', error);
    });
  }
  

      ionViewDidEnter(){
        this.HideMenu(true);
      }
      
      ionViewWillLeave(){
        this.HideMenu(false)
      }
     
     HideMenu(b: boolean): void {
       return this.hideMenuServie.setMenuHidden(b);
     }

}
