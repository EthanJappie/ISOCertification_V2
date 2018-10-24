import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidationProvider } from './../../providers/validation/validation';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { navOptions } from '../../app/animate';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController,public formBuilder: FormBuilder,private alertCtrl: AlertController, private loadingCtrl: LoadingController,public firebase:FirebaseProvider) {
    this.loginForm = formBuilder.group({
      email: ['',
      Validators.compose([Validators.required, ValidationProvider.isValid])],
      password: ['',
      Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(): void {
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.firebase.login(this.loginForm.value.email,
        this.loginForm.value.password)
      .then( authData => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(HomePage,null,navOptions);
        });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  public createAccount() {
    this.navCtrl.push('RegisterPage',null,navOptions);
  }

}
