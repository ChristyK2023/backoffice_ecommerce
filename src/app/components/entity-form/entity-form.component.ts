import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.css'
})
export class EntityFormComponent {

  @Input() entityNames : Array<string> = []
  @Input() data : any;

  form: any;

  @Output() formEmit = new EventEmitter<any>()

  constructor (private fb: FormBuilder) {}

  ngOnInit() {

    console.log({entityNames: this.entityNames});

    this.entityNames = this.entityNames.filter((name: String)=>{
      if (name === "created_at") {
        return false
      }
      if (name === "updated_at") {
        return false
      }
      return true
    })

    this.initForm()

  }

  initForm() {
    let formObject = {}
    this.entityNames.forEach((name: any)=>{
      const value = this.data[name]
      formObject = {...formObject,[name]: this.fb.control(value, Validators.required)}
    })
    this.form = this.fb.group(formObject)
  }
  // Fonction qui soumet le formulaire
  handleSubmit() {
    /**
     * Options
     * Categories
     * Images
     */

    this.formEmit.emit({type: "NORMAL", form: this.form.value})

  }

}
