import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgDragDropModule } from 'ng-drag-drop';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { User } from '../model/User.class';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user : User = new User();
  success : any;
  constructor(private AuthS : AuthService, private FS : FirestoreService) { }

  ngOnInit() {
  }

  async onRegister(){

    try{
      const user = await this.AuthS.onRegister(this.user);
      const userData = await this.FS.addCollection(this.user);
      this.success = true;

    } catch{
      this.success = false;
    }
  }
 
}