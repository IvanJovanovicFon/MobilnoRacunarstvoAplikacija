import { Component, OnInit } from '@angular/core';
import { HideMenuService } from '../services/hide-menu.service';

@Component({
  selector: 'app-movie-notes',
  templateUrl: './movie-notes.page.html',
  styleUrls: ['./movie-notes.page.scss'],
})
export class MovieNotesPage  {

constructor(private hideMenuService: HideMenuService){}

isMenuHidden(): boolean {
  return this.hideMenuService.getMenuHidden();
}

setMenuVisibility(hidden: boolean): void {
  this.hideMenuService.setMenuHidden(hidden);
}
}
