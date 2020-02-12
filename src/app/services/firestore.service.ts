import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../model/User.class';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  itemsCollection: AngularFirestoreCollection<any>;
  items: any;
  user : User;
  collection : string = "Users";
  email: string = "@tranzorg.hu"
  public ideasCollection: AngularFirestoreCollection<User>;
  public ideas: Observable<any[]>;

  constructor(private AF: AngularFirestore) { 
  }

  async addCollection(user : User){
    await this.AF.collection(this.collection).doc(user.email + this.email).set({
      role: "none",
      name: user.email
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  }

  async updateCollection(name, role){
    
    const snapshot = await this.AF.collection(this.collection).doc(name + this.email).get()
    const documents = [];
    var data = snapshot.forEach(doc => { 
        this.Update(doc.data(),role);
    });
    
  }

  async Update(data, role){
    console.log(data["role"] + " " + role)
    if(data["role"] != role){
      var UserCollection = this.AF.collection(this.collection).doc(data["name"] + this.email);
        return UserCollection.update({
            role: role
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
      }

  }
 
  async getCollectionData(){
    const snapshot = await this.AF.collection(this.collection).valueChanges();
    return snapshot;
  }


  async getRole(user: User){

    const snapshot = await this.AF.collection(this.collection).doc(user.email).get()
    const documents = [];
    snapshot.forEach(doc => { 
      console.log(doc.data())
      return doc.data()
    });
    return documents;
}
}
