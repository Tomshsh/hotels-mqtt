import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() inputs: any[]
  @Output() formSubmit: EventEmitter<any> = new EventEmitter()
  controls = {}

  get duplicates(){
    return this._duplicates
  }
  set duplicates(arg: FormArray){
    this._duplicates = arg
  }
  private _duplicates: FormArray

  formGroup: FormGroup

  constructor(private fb: FormBuilder) {

  }

  onSubmit() {
    this.formSubmit.emit(this.formGroup.value)
  }


  ngOnInit(): void {

    this.inputs.map(i => {
      Object.assign(this.controls, {
        [i.name]: i.input === "duplicatable"
          ? this.fb.array([this.fb.control(i.value)])
          : i.value
      })
    })
    this.formGroup = this.fb.group(this.controls)

    this.duplicates = this.formGroup.get(this.inputs.find(i => i.input === 'duplicatable').name) as FormArray;

  }

  duplicate() {
    this.duplicates.push(this.fb.control(''))
  }

}
