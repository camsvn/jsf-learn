import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router'
// import { SQLiteService } from '../../services/sqlite.service'

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
  // private _queryUser = "SELECT id,fname,password FROM user WHERE username = ?";  

  constructor(
    // private _SQLiteService: SQLiteService,
    private _router: Router
    ) { }
 
  async onLogin(){
    console.log("Login Clicked")
    // if (this.loginForm.valid) {
    //   console.log(this.loginForm.value)
    //   // console.log(this.loginForm.value.username);
    //   this._SQLiteService.query(this._queryUser,[this.loginForm.value.username])
    //   .then(data => {
    //     // console.log("Returned", data.values)
    //     this.btn_disabled = true;        
    //     setTimeout(()=>{
    //       if(data.values.length && data.values[0].password === this.loginForm.value.password){
    //         localStorage.setItem("loggedIn","true");
    //         localStorage.setItem("user",JSON.stringify({
    //           id: data.values[0].id,
    //           name: data.values[0].fname
    //         }));
    //         this._SQLiteService.presentToast("Success");
    //         this.loginForm.setValue({
    //           username: '',
    //           password: ''
    //         })
    //         this._router.navigateByUrl('/home')          
    //       } else{
    //         localStorage.setItem("loggedIn","false");
    //         this._SQLiteService.presentToast("Invaid Username or Password");
    //       }
    //       this.btn_disabled = false
    //     }, 1500)
    //   })
    // } else {
    //   this._SQLiteService.presentToast("Error:Invalid Inputs")
    // }
  }

}
