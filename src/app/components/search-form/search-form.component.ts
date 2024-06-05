import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent {

  @Input() name: any = "name"
  @Output() newValue = new EventEmitter<any>()

  value: String = ""

  handleSubmit(event: any) {
    event.preventDefault() // Stop toute action

    if (this.value) {
      const data: any = {name: this.name, value: this.value}
      this.newValue.emit(data)
    }else {
      this.newValue.emit(null)
    }
    //const { name, value } = event.target
    //console.log(this.value);

  }

}
