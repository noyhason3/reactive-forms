import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  form = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(null),
      email: new FormControl(null)
    })

    onSubmit(){
      console.log(this.form.value);
    }
}
