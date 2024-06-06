import { Component, EventEmitter, Input, Output } from '@angular/core';
import { generateId } from '../../../helpers/util';

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styleUrl: './option-form.component.css'
})
export class OptionFormComponent {

  @Input() options: any;
  @Output() emitOption = new EventEmitter<any>()

  constructor () { }

  ngOnInit() {
    this.options = this.options ? this.options : []
    console.log(this.options);
  }
  // Ajoute une option
  addOption() {
    this.options.push({
      _id: generateId(),
      name: "Option Name",
      values: [
        {
          _id: generateId(),
          name: "Option Value"
        }
      ]
    })
  }
  // Modifier une option
  updateOption(event: any, optionId: String) {
    const { value } = event.target
    // On parcours les options
    this.options = this.options.map((option: any) => {
      if (option._id === optionId) {
        option.name = value
      }
      return option
    })
    this.emitOption.emit(this.options)
  }
  // Modifier une valeur d'une option
  updateOptionValue(event: any, optionId: String, valueId: String) {
    const { value } = event.target
    // On parcours les options
    this.options = this.options.map((option: any) => {
      if (option._id === optionId) {
        option.values = option.values.map((valueItem: any) => {
          if (valueItem._id === valueId) {
            valueItem.name = value
          }
          return valueItem
        })
      }
      return option
    })
    this.emitOption.emit(this.options)
  }
  // Ajoute une valeur
  addOptionValue(optionId: String) {
    this.options = this.options.map((option: any)=> {
      if (option._id === optionId) {
        option.values.push({
          _id: generateId(),
          name: "Option Value"
        })
      }

      return option
    })
  }
  // Suppression des options
  removeOption(optionId: String) {
    this.options = this.options.filter((option: any) =>
      option._id !== optionId
    )
    this.emitOption.emit(this.options)
  }
  // Suppression des valeurs
  removeOptionValue(optionId: String, valueId: String) {
    this.options = this.options.map((option: any) => {
      if (option._id === optionId) {
        option.values = option.values.filter((item: any) =>
          item._id !== valueId
        )
      }
      return option
    })
    this.emitOption.emit(this.options)
  }

}
