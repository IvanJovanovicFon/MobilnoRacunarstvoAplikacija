import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HideMenuService {

  private menuHidden = false;

  getMenuHidden(): boolean {
    return this.menuHidden;
  }

  setMenuHidden(hidden: boolean): void {
    this.menuHidden = hidden;
  }
}
