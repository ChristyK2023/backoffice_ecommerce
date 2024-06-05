import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatName'
})
export class FormatNamePipe implements PipeTransform {

  transform(value: String): String {

    if (value === "imageUrls") {
      return "Image"
    }

    if (value === "isBestSeller") {
      return "Best Seller"
    }

    if (value === "isNewArrival") {
      return "New Arrival"
    }

    if (value === "isFeatured") {
      return "Featured"
    }

    if (value === "isSpecialOffer") {
      return "SpecialOffer"
    }

    // test_merci
    let newValueArray: any = value.split("_")
    // ["test", "merci"]
    newValueArray = newValueArray.map(
      (name: String)=>name.charAt(0).toUpperCase()+name.slice(1)
    )
    // ["Test", "Merci"]

    let newValue = newValueArray.join(" ")
    // "Test Merci"

    return newValue;
  }

}
