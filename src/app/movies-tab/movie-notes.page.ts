import { Component, OnInit } from '@angular/core';
import { HideMenuService } from '../services/hide-menu.service';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-movie-notes',
  templateUrl: './movie-notes.page.html',
  styleUrls: ['./movie-notes.page.scss'],
})
export class MovieNotesPage  {
  private activeTab?: HTMLElement;

constructor(private hideMenuService: HideMenuService){}

isMenuHidden(): boolean {
  return this.hideMenuService.getMenuHidden();
}

setMenuVisibility(hidden: boolean): void {
  this.hideMenuService.setMenuHidden(hidden);
}



tabChange(tabsRef: IonTabs) {
  this.activeTab = tabsRef.outlet.activatedView?.element;
}

ionViewWillLeave() {
  this.propagateToActiveTab('ionViewWillLeave');
}

ionViewDidLeave() {
  this.propagateToActiveTab('ionViewDidLeave');
}

ionViewWillEnter() {
  this.propagateToActiveTab('ionViewWillEnter');
}

ionViewDidEnter() {
  this.propagateToActiveTab('ionViewDidEnter');
}

private propagateToActiveTab(eventName: string) {    
  if (this.activeTab) {
    this.activeTab.dispatchEvent(new CustomEvent(eventName));
  }
}
}
