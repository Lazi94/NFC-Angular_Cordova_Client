import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgDragDropModule } from 'ng-drag-drop';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FirestoreService } from '../services/firestore.service';
import { User } from '../model/User.class';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  item: any[];
  none : UserRole[] = [];
  admin : UserRole[] = [];
  reader : UserRole[] = [];
  writer : UserRole[] = [];

  constructor(private FS : FirestoreService) { 
    this.getData();
  }

  ngOnInit() {
  }
  async getData(){
    const data = (await this.FS.getCollectionData()).subscribe(items => this.assign(items));
  }

  assign(items){
    for(var i = 0; i < items.length; i++){

    if(items[i]["role"] != null && items[i]["name"] != null){

      if(items[i]["role"] == "none"){
        this.none.push({
          role: items[i]["role"],
          name: items[i]["name"]
        })
      }

      if(items[i]["role"] == "admin"){
        this.admin.push({
          role: items[i]["role"],
          name: items[i]["name"]
        })
      }

      if(items[i]["role"] == "reader"){
        this.reader.push({
          role: items[i]["role"],
          name: items[i]["name"]
        })
      }

      if(items[i]["role"] == "writer"){
        this.writer.push({
          role: items[i]["role"],
          name: items[i]["name"]
        })
      }

    }
  }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log(event.container.data)
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

}

export interface UserRole{
  role : string;
  name: string;
}



