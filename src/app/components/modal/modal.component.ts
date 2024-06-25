import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() modalTitle: String = ""
  @Input() modalContent: String = ""
  @Output() confirmAction = new EventEmitter<any>()
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

  handleConfirmModal() {
    this.myModal.hide()
    this.confirmAction.emit(true)
  }

}
