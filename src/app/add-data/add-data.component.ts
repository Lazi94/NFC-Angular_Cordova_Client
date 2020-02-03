import { Component, OnInit } from '@angular/core';
import { deviceData } from '../model/deviceData';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})



export class AddDataComponent implements OnInit {

  data : deviceData = new deviceData();
  type : any;
  number : any;
  success : any;
  AlertType: string = "succes";
  Options = ["Konténer", "Szivattyú"];

  constructor(private FBS : FirebaseService) { }


  save(){

    var date = new Date();
    var datefor = date.toISOString();
    const error = false;

    this.data.date = datefor;
    const fullData =  this.type + this.number;
    console.log(fullData)
    try{
      this.FBS.createData(this.data, fullData);
      this.success = true;
    } catch{
        this.success = false; 
    }

  }


  getItem(option){
    this.type = option;
  }

  ngOnInit() {
  }

}
