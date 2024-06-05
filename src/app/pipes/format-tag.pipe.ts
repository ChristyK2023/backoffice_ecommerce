import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTag'
})
export class FormatTagPipe implements PipeTransform {

  transform(value: any, tag: String): unknown {
    let newValue = value
    if (tag) {
      let newTag: any = tag
      let valueArray = value.split(new RegExp(newTag, 'i'))
      newValue = valueArray.join("<span class='tag'>"+newTag+"</span>")
    }
    //console.log(newValue);

    return newValue;
  }

}
