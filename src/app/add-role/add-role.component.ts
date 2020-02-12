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
  isSet : boolean = false; 

  constructor(private FS : FirestoreService) { 
   
  }

  ngOnInit() {
    console.log(this.isSet)
    this.getData();
    //this.isSet = false;
  }
  async getData(){
    const data = (await this.FS.getCollectionData()).subscribe(items => this.assign(items));
  }

  assign(items){
    //if(this.isSet == false){
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
      //}

      this.isSet = true;
    }
  }
  updateData(id, data){
    for(var i = 0; i < data.length; i++){

      if(id == "cdk-drop-list-0"){

        this.updateInterface("writer", data[i][name]);
        this.FS.updateCollection(data[i]["name"], "writer");

      } else if (id == "cdk-drop-list-1"){
        
        this.updateInterface("reader", data[i][name]);
        this.FS.updateCollection(data[i]["name"], "reader");

      } else if (id == "cdk-drop-list-2"){

        this.updateInterface("admin", data[i][name]);
        this.FS.updateCollection(data[i]["name"], "admin");

      } else if (id == "cdk-drop-list-3"){

        this.updateInterface("none", data[i][name]);
        this.FS.updateCollection(data[i]["name"], "none");

      }
    }
  }

  updateInterface(role, name){

    if(role == "none"){
      for(var i=0; i < this.none.length; i++){
        if(this.none[i]["name"] == name){
            this.none[i][role] = role
        }
      }
    }

    if(role == "admin"){
      for(var i=0; i < this.admin.length; i++){
        if(this.admin[i]["name"] == name){
            this.admin[i][role] = role
        }
      }
    }

    if(role == "writer"){
      for(var i=0; i < this.none.length; i++){
        if(this.none[i]["name"] == name){
            this.none[i][role] = role
        }
      }
    }

    if(role == "reader"){
      for(var i=0; i < this.none.length; i++){
        if(this.none[i]["name"] == name){
            this.none[i][role] = role
        }
      }
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
    
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
        this.updateData(event.container.id, event.container.data);
    }
  }

}

export interface UserRole{
  role : string;
  name: string;
}



