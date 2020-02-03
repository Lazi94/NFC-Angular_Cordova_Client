import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { deviceData } from '../model/deviceData';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  private dbRef : string;

  Data: AngularFireList<deviceData> = null;

  constructor(private db: AngularFireDatabase){
    this.Data = db.list('/data');
  }

  getData() : AngularFireList<deviceData>{
    return this.Data;
  }

  createData(deviceData : deviceData, dbRef): void{
    const Retval = this.db.list('/data/' + dbRef).push(deviceData);
  }

}
