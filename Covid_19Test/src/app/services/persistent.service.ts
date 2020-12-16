import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersistentService {

  constructor() { }

  // public editDataDetails: any = [];
  private loggedIn = new  BehaviorSubject(localStorage.getItem('loggedIn') ? localStorage.getItem('loggedIn') : false);
  private userDetail = new  BehaviorSubject(localStorage.getItem('loggedIn') ? [localStorage.getItem('user')] : []);
  // private messageSource = new  BehaviorSubject(this.editDataDetails);
  
  /**
   * gets current message
   * @memberof Observable
   */
  // currentMessage = this.messageSource.asObservable();

  /**
   * gets current login status
   * @memberof Observable
   */
  isLoggedIn = this.loggedIn.asObservable();
  
  /**
   * gets user details
   * @memberof Observable
   */
  getUserDetails = this.userDetail.asObservable();

  /**
   * Change Login state
   * @memberof BehaviorSubject
   */
  changeLoginStatus(status: boolean) {
    this.loggedIn.next(status)
    localStorage.setItem("loggedIn",`${status}`);              
  }

  /**
   * Change userDetails state
   * @memberof BehaviorSubject
   */
  changeUserDetails(payload: string) {
    this.userDetail.next([payload])
    localStorage.setItem("user",payload);
  }
}
