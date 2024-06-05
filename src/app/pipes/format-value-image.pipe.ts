import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatValueImage'
})
export class FormatValueImagePipe implements PipeTransform {

  transform(value: any, args: Array<any>): unknown {

    let newValue = value
    let name = args[0]

    if (name == "imageUrls"){
      const url = value[0]
      newValue = `<img src="${url}" width="50" height="50" />`
    }

    return newValue;
  }
}
