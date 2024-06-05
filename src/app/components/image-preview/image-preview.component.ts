import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.css'
})
export class ImagePreviewComponent {

  @Input() src: String = ""
  @Output() closeModal = new EventEmitter<any>()

  myModal: any

  constructor () { }

  ngOnInit() {
    const WT: any = window
    this.myModal = new WT["bootstrap"].Modal("#imagePreview", {keyboard: false})
    this.myModal.show()
  }

  handleCloseModal() {
    this.myModal.hide()
    this.closeModal.emit(true)
  }

}
