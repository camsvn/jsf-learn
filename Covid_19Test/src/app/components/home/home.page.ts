import { Component, OnInit } from '@angular/core';
import { PersistentService } from 'app/services/persistent.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userDetails: any;
  user: string;

  constructor(
    private _PersistentService: PersistentService
  ) {}

  ngOnInit() {
    this._PersistentService.getUserDetails.subscribe(data => {
      if(data.length) {
        this.userDetails = JSON.parse(data[0]);
        this.user = `${this.userDetails.data.userdetails.firstname} ${this.userDetails.data.userdetails.lastname ? this.userDetails.data.userdetails.lastname : null }` 
      }
    });
  }

}
