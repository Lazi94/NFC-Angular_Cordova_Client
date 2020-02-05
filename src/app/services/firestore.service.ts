import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../model/User.class';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  items: any;

  constructor(private AF: AngularFirestore) { }

  async addCollection(user : User){
    await this.AF.collection("Users").doc(user.email + "@tranzorg.hu").set({
      role: "none"
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  }

 async getRole2(user: User){
   console.log(user.email)
    var itemCollection = await this.AF.collection('Users').doc(user.email).get();
    //var test=  itemCollection.valueChanges().subscribe(items =>console.log(items));
    console.log(itemCollection)
    return this.items;
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
