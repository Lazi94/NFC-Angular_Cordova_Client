import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { getLocaleDateFormat } from '@angular/common';
import { DataLayerManager } from '@agm/core';
import { deviceData } from '../model/deviceData';
import { FirebaseService } from '../services/firebase.service';
import { map } from 'rxjs/operators';

import { NgxSpinnerService } from "ngx-spinner";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  deviceData : any;
  asd : any;
  items: Observable<any[]>;
  itemCollection: AngularFirestoreCollection<any>;
  noteRef: AngularFirestoreDocument

  constructor(private db: AngularFirestore, private firestore: AngularFireDatabase, private FS : FirebaseService, private FBS : FirebaseService, private spinner: NgxSpinnerService){

    
  }

  ngOnInit() {
    this.noteRef = this.db.doc('User/Alma');
    this.noteRef.valueChanges();
    console.log(this.noteRef)

    var itemCollection = this.db.collection('User', ref => ref.where('Name', '==' ,'kecske'));
    itemCollection.valueChanges().subscribe(data => console.log(data));
    console.log(this.items)

   
      
    this.spinner.show();
  }

  createPolicy(){

    var date = new Date();
    var datefor = date.toISOString();
/*
    var test =this.firestore.database.ref('/data/konténer1').push({
      latitude : 47.5125307,
      longitude : 19.0348176,
      user: 'alma',
      date: datefor,
      mobileDevice: 'Huwaei'
    });
*/

    /*
    var ref = this.firestore.database.ref("/donor");
    ref.on('value', function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log(childData);
      });

    });*/
    
}

 

  test(deviceData){
      console.log(deviceData[5]);
      this.asd = deviceData[5];
  }

 

}
