import { Component, OnInit } from '@angular/core';
import { deviceData } from '../model/deviceData';
import { FirebaseService } from '../services/firebase.service';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  deviceData : any;

  constructor(private FS : FirebaseService, private FBS : FirebaseService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  latitude = 47.5125307;
  longitude = 19.0348176;
  title = 'NFC-Client';

  async getAllData(){
    await this.FBS.getData().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(deviceData => {
      this.deviceData = deviceData;
    })
  
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
