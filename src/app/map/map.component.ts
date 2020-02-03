import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { GoogleMapsAPIWrapper, MouseEvent, AgmMap, LatLngBounds, LatLngBoundsLiteral } from '@agm/core';
import { FirebaseService } from '../services/firebase.service';
import { map } from 'rxjs/operators';
import { deviceData } from '../model/deviceData';
import { Location } from '../model/Location';
import { SharedService } from '../services/shared.service'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  deviceData : any[] = [];
  title = 'NFC-Client';
  location: Location;
  message: number;
 

  constructor(private FBS : FirebaseService, private ss : SharedService){
      this.getAllData();

      this.ss.Message.subscribe(
        message => {
          this.setCordinates(message)
        }
      )
      this.init();

  }
  init(){
    this.location ={
      longitude: 20,
      latitude:  15,
      zoom: 5
    }
  }

  ngOnInit() {

  }

  ngOnChanges(){

  }

  setCordinates(value){
   for(var i = 0;i < this.deviceData.length; i++){
     if(this.deviceData[i]["name"] == value){
       this.location = {
         latitude: parseFloat(this.deviceData[i]["latitude"]),
         longitude : parseFloat(this.deviceData[i]["longitude"]),
         zoom: 9
        }
     }
   }
 }

 
 async getAllData(){
  await this.FBS.getData().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
        )
      )
  ).subscribe(deviceData => {
    this.seperataData(deviceData)
  })

}
seperataData(data){
var j = 0;
  for(var i = 0; i < data.length; i++){
    
    j = 0;
    for (var key in data[i]) {
      if(j == 0){
        var name = data[i][key];
      }

      if(j > 0){
        data[i][key]["name"] = name;
       this.deviceData.push(data[i][key]);
    }

    j++;
    }
  }
}
  /*
  [iconUrl]="icon"
  icon = {
    url: '',
    scaledSize: {
      width: 15,
      height: 15
    }
}*/


}

