import { Component, Injectable,Input,Output,EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
 
  private MessageSource = new Subject<string>();
  Message = this.MessageSource.asObservable();

  sendMessage(message : string){
      this.MessageSource.next(message);
  }
}
