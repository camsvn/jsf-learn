import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private _PersistentService: PersistentService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._PersistentService.getUserDetails.subscribe(data => {
      if(data.length) {
        this.userDetails = JSON.parse(data[0]);
        this.user = `${this.userDetails.data.userdetails.firstname} ${this.userDetails.data.userdetails.lastname ? this.userDetails.data.userdetails.lastname : null }` 
      }
    });
  }

  onLogout() {
    this._PersistentService.logout();
    this._router.navigateByUrl('/login')
  }

}
