import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  form = new FormGroup({
      name: new FormControl('', [Validators.required, ContactFormComponent.testValidator]),
      age: new FormControl(null, Validators.required),
      email: new FormControl(null, )})
    // }, {validator: ContactFormComponent.checkAgeExists})

    static testValidator(control:AbstractControl){
      const regexp = /^[a-z]/i
      const valid= regexp.test(control.value)
      return valid ? null : {invalidName:true}
    }

    // static checkAgeExists(control:AbstractControl){
    //     const age = control.get('age')
    //     const email = control.get('email')
    //     if (!(age && !email)) return null;

    // }

    onSubmit(){
      console.log(this.form.value);

    }

    get name(){return this.form.get('name')}
}
