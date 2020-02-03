import { Component, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth'
import { CheckboxControlValueAccessor } from '@angular/forms';
import { AuthGuard } from './guard/auth.guard';
import { FirebaseService } from './services/firebase.service';
import { map } from 'rxjs/operators';
import { deviceData } from './model/deviceData';

import { MapComponent } from '../app/map/map.component'
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild(MapComponent, {static : false}) child: MapComponent ; 
  Logged : boolean = false;
  deviceData : any;
  key : any[];

  @Input()
  routerLinkActiveOptions: {
      exact: boolean;
  }

  constructor(private Map : MapComponent, private router: Router, private aSfAuth: AuthService, private Afuth: AngularFireAuth, private AtG : AuthGuard,private FBS : FirebaseService,
              private ss: SharedService ){
         this.Logged = this.aSfAuth.isLogged;
  }

  async getLogged(){
    this.Logged = await this.aSfAuth.IsLoggedIn();
    this.checkAuth(this.Logged);
  }

  async ngOnInit(){
    this.getLogged();
    this.getAllData();
  }

  checkAuth(value){
    if(value){
      //this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/login');
    } 
  }

  getKey(value){
    this.ss.sendMessage(value);
  }

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
  onLogut(){
    this.aSfAuth.Logout();
      this.router.navigateByUrl('/login');
  }

}
