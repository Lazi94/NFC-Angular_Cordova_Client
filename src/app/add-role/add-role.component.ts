import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgDragDropModule } from 'ng-drag-drop';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FirestoreService } from '../services/firestore.service';
import { User } from '../model/User.class';
import { TestBed } from '@angular/core/testing';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

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
  closeResult: string;
  user : User = new User();
  success : boolean = false;
  fail : boolean = false;
  UserName : string;

  constructor(private FS : FirestoreService, private modalService: NgbModal, private AuthS : AuthService) { 
   
  }

  ngOnInit() {

    this.getUsername();
    this.getData();

  }
  async getUsername(){
    this.UserName = await this.AuthS.UserName()
  }

  async getData(){
    const data = (await this.FS.getCollectionData()).subscribe(items => this.assign(items));
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


 async test(){
    this.success = false;
    this.fail = false;

    try{
      const user = await this.AuthS.onRegister(this.user);
      if(user != null){
      const userData = await this.FS.addCollection(this.user);
        this.success = true;
        this.modalService.dismissAll();
      } else {
        this.fail = true;
      }
    } catch{

    }

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  assign(items){
      this.none.length = 0;
      this.writer.length = 0;
      this.reader.length = 0;
      this.admin.length = 0;

      for(var i = 0; i < items.length; i++){

        if(items[i]["role"] != null && items[i]["name"] != null){
          
          var draggable = false;

          if(items[i]["name"] + "@tranzorg.hu" == this.UserName["email"]){
              draggable = true;
          }


          if(items[i]["role"] == "none"){
              this.none.push({
                role: items[i]["role"],
                name: items[i]["name"],
                draggable: draggable
              })
          }

          if(items[i]["role"] == "admin"){
            this.admin.push({
              role: items[i]["role"],
              name: items[i]["name"],
              draggable: draggable
            })
          } 

          if(items[i]["role"] == "reader"){
            this.reader.push({
              role: items[i]["role"],
              name: items[i]["name"],
              draggable: draggable
            })
          }

          if(items[i]["role"] == "writer"){
            this.writer.push({
              role: items[i]["role"],
              name: items[i]["name"],
              draggable: draggable
            })
          }

        }

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
  draggable : boolean;
}



