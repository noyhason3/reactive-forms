import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  form = new FormGroup(
    {
      detail: new FormGroup({
        name: new FormControl('', [
          Validators.required,
          ContactFormComponent.testValidator,
        ]),
        age: new FormControl(null, Validators.required),
        email: new FormControl(null),
      }),
      color: this.createStock({}),
      stock: new FormArray([
        this.createStock({ colorName: 'blue', quantity: 15 }),
        this.createStock({ colorName: 'red', quantity: 5 }),
      ]),
    },
    ContactFormComponent.checkStockExists
  );

  createStock(stock: any) {
    return new FormGroup({
      colorName: new FormControl(stock.colorName || ''),
      quantity: new FormControl(stock.quantity || 5),
    });
  }

  onAdd() {
    const control = this.form.get('stock') as FormArray;
    const newColor = this.form.get('color')?.value;
    control.push(this.createStock(newColor));
  }

  onRemove(group: {}, index: number) {
    console.log(group, index);
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }

  static testValidator(control: AbstractControl) {
    const regexp = /^[a-z]/i;
    const valid = regexp.test(control.value);
    return valid ? null : { invalidName: true };
  }

  static checkStockExists(control: AbstractControl) {
    const stockItems = control.get('stock');
    const color = control.get('color');

    if (!(stockItems && color)) return null;

    const exists = stockItems.value.some((item: any) => {
      return item.colorName === color.value.colorName;
    });
    return exists ? { stockExists: true } : null;
  }

  onSubmit() {
    console.log(this.form.value);
  }

  get notSelected(){
    return !this.form.get('color.colorName')?.value;
  }

  get stockExists(){
    return this.form.hasError('stockExists') && this.form.get('color.colorName')?.dirty;
  }

  get stocks() {
    return (this.form.get('stock') as FormArray).controls;
  }
  // get name() {
  //   return this.form.get('name');
  // }
}
