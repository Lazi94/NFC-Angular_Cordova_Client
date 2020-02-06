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

  public ideasCollection: AngularFirestoreCollection<User>;
  public ideas: Observable<any[]>;

  constructor(private AF: AngularFirestore) { }

  async addCollection(user : User){
    await this.AF.collection("Users").doc(user.email + "@tranzorg.hu").set({
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

 
  async getCollectionData(){
    const snapshot = await this.AF.collection('Users').valueChanges();
    return snapshot;
  }

  async getRole(user: User){
    const snapshot = await this.AF.collection('Users').doc(user.email).get()
    const documents = [];
    snapshot.forEach(doc => { 
       console.log(doc.data())
    });
    return documents;
}
}
