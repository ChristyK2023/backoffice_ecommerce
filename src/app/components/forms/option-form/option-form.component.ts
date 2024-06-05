import { Component, Input } from '@angular/core';
import { generateId } from '../../../helpers/util';

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styleUrl: './option-form.component.css'
})
export class OptionFormComponent {

  @Input() options: any;

  constructor () { }

  ngOnInit() {
    this.options = this.options ? this.options : []
    console.log(this.options);
  }

  addOption() {
    this.options.push({
      _id: generateId(),
      name: "Option Name",
      values: [
        {
          _id: generateId(),
          value: "Option Value"
        }
      ]
    })
  }

  addOptionValue(optionId: String) {

  }

}
