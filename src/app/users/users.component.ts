import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  Selector : boolean;

  constructor() { }

  ngOnInit() {
      this.Selector = true;
  }

  change(value){
      this.Selector = value;
  }

}
