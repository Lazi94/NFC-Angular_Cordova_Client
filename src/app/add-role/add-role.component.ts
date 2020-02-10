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
  updateData(id, data){
    console.log(data.length)
    console.log(id)
    for(var i = 0; i = data.length; i++){
      console.log(data[i])
      if(id == "cdk-drop-list-0"){
        this.FS.updateCollection(data[i]["name"], "writer");
      } else if (id == "cdk-drop-list-1"){
        this.FS.updateCollection(data[i]["name"], "reader");
      } else if (id == "cdk-drop-list-2"){
        this.FS.updateCollection(data[i]["name"], "admin");
      } else if (id == "cdk-drop-list-3"){
        this.FS.updateCollection(data[i]["name"], "none");
      }
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      for(var i=0; i <= event.container.data.length; i++){
         // console.log(event.container.data[0]["name"])
      }
      console.log(event.container.data.length)
     // this.updateData(event.container.id, event.container.data);
 
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



