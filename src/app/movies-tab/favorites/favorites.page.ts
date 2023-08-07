import { Component, OnInit } from '@angular/core';
import { HideMenuService } from 'src/app/services/hide-menu.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

constructor(private menuService:HideMenuService){}

ngOnInit(): void {
  this.menuService.setMenuHidden(false)
  console.log(this.menuService.getMenuHidden())
}

}


