import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { rejects } from 'assert';
import { Observable } from 'rxjs';
import { PersistentService } from './persistent.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (
    private _PersistentService: PersistentService,
    private _router: Router
  ) { }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  canActivate() : Promise<boolean> {
    return new Promise((resolve,reject) => {
      this._PersistentService.isLoggedIn.subscribe(loggedIn => {
        if(!loggedIn){
          return resolve(loggedIn);
        } else {
          return resolve(loggedIn);
        }
      })
    })
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor (
    private _PersistentService: PersistentService,
    private _router: Router
  ) { }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  canActivate() : Promise<boolean> {
    return new Promise((resolve,reject) => {
      this._PersistentService.isLoggedIn.subscribe(loggedIn => {
        if(loggedIn){
          // this._router.navigateByUrl('/home')
          return resolve(false);
        } else {
          return resolve(true);
        }
      })
    })
  }
}
