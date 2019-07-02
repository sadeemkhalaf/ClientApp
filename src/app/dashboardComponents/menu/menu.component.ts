import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private userName = 'User';
  private menuIcon = '';
  private date = new Date();
  private weekday: string = this.date.toLocaleString('en-us', { weekday: 'long'});
  private month: string = this.date.toLocaleString('en-us', { month: 'short'});
  private day: string = this.date.getDate().toString();

  constructor() {}
  ngOnInit() {
    this.menuIcon = 'menu';
    console.log(this.month, this.weekday, this.day);
    console.log(this.date.getDate());
  }

  private changeIcon(event: any) {
    if (!!event) {
      !this.menuIcon.match('menu') ? this.menuIcon = 'menu' : this.menuIcon = 'arrow_back_ios';
    }
  }

}
