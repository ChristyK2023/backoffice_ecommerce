import { Component, EventEmitter, Input, Output } from '@angular/core';
import { generateId } from '../../../helpers/util';
import { WebNotificationService } from '../../../services/web-notification.service';

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styleUrl: './option-form.component.css',
})
export class OptionFormComponent {
  @Input() options: any | undefined;
  @Output() emitOption = new EventEmitter<any>();

  //localOption: any[] = [];

  constructor(private notificationService: WebNotificationService) {}

  ngOnInit() {
    //this.options = this.options ? this.options : [];
    //this.options = [];

    //if (this.options === undefined) {
    // this.options = [];
    //}

    if (
      this.options === undefined ||
      this.options.length === 0 ||
      this.options.length === undefined
    ) {
      this.options = [];
    } else {
      this.options = this.options ? this.options : [];
    }

    console.log('Valeur Option : ' + this.options.length);
  }
  // Ajoute une option
  addOption() {
    this.options.push({
      _id: generateId(),
      name: 'Option Name',
      values: [
        {
          _id: generateId(),
          //value: "Option Value"
          name: 'Option Value',
        },
      ],
    });
    console.log(this.options);
    this.notificationService.emitNotification({
      status: 'success',
      message: 'New Option Added !',
    });
  }
  // Modifier une option
  updateOption(event: any, optionId: String) {
    const { value } = event.target;
    // On parcours les options
    this.options = this.options.map((option: any) => {
      if (option._id === optionId) {
        option.name = value;
      }
      return option;
    });
    this.emitOption.emit(this.options);
  }
  // Modifier une valeur d'une option
  updateOptionValue(event: any, optionId: String, valueId: String) {
    const { value } = event.target;
    // On parcours les options
    this.options = this.options.map((option: any) => {
      if (option._id === optionId) {
        option.values = option.values.map((valueItem: any) => {
          if (valueItem._id === valueId) {
            valueItem.name = value;
          }
          return valueItem;
        });
      }
      return option;
    });
    this.emitOption.emit(this.options);
  }
  // Ajoute une valeur
  addOptionValue(optionId: String) {
    this.options = this.options.map((option: any) => {
      if (option._id === optionId) {
        option.values.push({
          _id: generateId(),
          name: 'Option Value',
        });
      }
      return option;
    });
    this.notificationService.emitNotification({
      status: 'success',
      message: 'New Value Added !',
    });
  }
  // Suppression des options
  removeOption(optionId: String) {
    this.options = this.options.filter(
      (option: any) => option._id !== optionId
    );
    this.emitOption.emit(this.options);

    this.notificationService.emitNotification({
      status: 'danger',
      message: 'Option Deleted !',
    });
  }
  // Suppression des valeurs
  removeOptionValue(optionId: String, valueId: String) {
    this.options = this.options.map((option: any) => {
      if (option._id === optionId) {
        option.values = option.values.filter(
          (item: any) => item._id !== valueId
        );
      }
      return option;
    });
    this.emitOption.emit(this.options);

    this.notificationService.emitNotification({
      status: 'danger',
      message: 'Value Deleted !',
    });
  }
}
