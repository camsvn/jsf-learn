import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router'
import { DBQueries } from 'app/globals/sqlite/query-operations';
import { SQLiteService } from 'app/services/sqlite.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  btn_disabled : boolean = false;

  constructor(
    private _SQLiteService: SQLiteService,
    private _router: Router
    ) { }
 
  async onLogin(){
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value)
      // console.log(this.loginForm.value.username);
      this._SQLiteService.query(DBQueries.getUser(this.loginForm.value.username))
      .then(data => {
        console.log("Returned", data.values)
        this.btn_disabled = true;        
        setTimeout(()=>{
          if(data.values.length) {
            let payload = JSON.parse(data.values[0].payload)
            // console.log(typeof payload, data.values[0].uuid, payload.userdetails);
            if(payload.userdetails.password === this.loginForm.value.password) {
              localStorage.setItem("loggedIn","true");
              localStorage.setItem("user",JSON.stringify({
                id: data.values[0].uuid,
                data: payload
              }));
              this._SQLiteService.presentToast(`logged in as ${payload.userdetails.firstname}`);
              this.loginForm.setValue({
                username: '',
                password: ''
              })
              this._router.navigateByUrl('/home') 
            } else {
              this._SQLiteService.presentToast("Invaid Username or Password");
            }       
          } else{
            localStorage.setItem("loggedIn","false");
            this._SQLiteService.presentToast("Invaid Username or Password");
          }
          this.btn_disabled = false
        }, 1500)
      })
    } else {
      this._SQLiteService.presentToast("Error:Invalid Inputs")
    }
  }

}
