import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isImage } from '../../helpers/util';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrl: './image-view.component.css'
})
export class ImageViewComponent {

  @Input() imageUrls: any = []
  @Output() emitFile = new EventEmitter<any>()
  imageUrl: any;
  files: any;
  availableFiles: any;
  errorMessage: String = "";
  isUpdating: any = false

  constructor () { }

  ngOnInit() {
   this.files = this.imageUrls.map((imageUrl: String) => {
      return {
        imageUrl: imageUrl,
        oldImage: imageUrl,
        action: "OLD"
      }
   })
   this.updateFile()
  }

  setImageView(url: any) {
    if (url) {
      this.imageUrl = url
    } else {
      this.imageUrl = null
    }
  }

  handleAddFile(event: any) {
    const fileInput : any = document.querySelector("#file")
    fileInput?.click()
  }

  addFile(event: any) {
    const file = event.target.files[0]
    const self: any = this

    if (!isImage(file.name)) {
      this.errorMessage = "Error file type !"
      return
    }
    this.errorMessage = ""

    if (file) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = function() {
        if (self.isUpdating) {
          // Update
          const url = self.isUpdating // ancien url

          self.files = self.files.map((fileItem: any) => {
            if (fileItem.imageUrl === url) {

              if (fileItem.action === "OLD") {

                fileItem.imageUrl = fileReader.result
                fileItem.file = file
                fileItem.action = "UPDATE"

              }else{

                fileItem.imageUrl = fileReader.result
                fileItem.file = file

              }

            }

            return fileItem

          })
          self.isUpdating = false

        } else {
          // Add
          self.files.push({
            imageUrl: fileReader.result,
            action: "ADD",
            file
          })
        }
        self.updateFile()
      }
    }
  }

  removeImage(url: String) {
    this.files = this.files.map((fileItem: any) => {
      if (fileItem.imageUrl === url) {
        if (fileItem.action == "ADD") {
          fileItem.action = "REMOVE"
        }else {
          fileItem.action = "DELETE"
        }
      }

      return fileItem
    })
    this.updateFile()
  }

  updateImage(url: String) {
    this.isUpdating = url
    this.handleAddFile(null)
  }

  updateFile() {
    this.files = this.files.filter((fileItem: any) =>
      fileItem.action !== "REMOVE"
    )
    this.availableFiles = this.files.filter((fileItem: any) =>
      fileItem.action !== "DELETE"
    )

    const sendFiles = this.files.filter((fileItem: any) =>
      fileItem.action !== "OLD"
    )
    this.emitFile.emit(sendFiles)
  }

}
