import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

/*
  Generated class for the ValidationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ValidationProvider {

  constructor() {
    console.log('Hello ValidationProvider Provider');
  }

  static isValid(control: FormControl) {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
      control.value
    );

    if (re) {
      return null;
    }

    return {
      invalidEmail: true,
    };
  }

}
