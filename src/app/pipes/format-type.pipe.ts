import { Pipe, PipeTransform } from '@angular/core';

enum Type {
  INPUT = "INPUT", // => Champ de saisie
  SELECT = "SELECT", // => Champ de sélection
  TEXT = "TEXT", // => Champ de texte
  IMAGE = "IMAGE" // => affichage d'image
}

@Pipe({
  name: 'formatType'
})

export class FormatTypePipe implements PipeTransform {

  transform(name: any, data: any): unknown {

    let type = Type.INPUT
    let selectDatas = [
      "status",
      "availability",
      "isBestSeller",
      "isNewArrival",
      "isFeatured",
      "isSpecialOffer"
    ]

    // Affiche la zone de sélection de selectDatas
    if (selectDatas.includes(name)) {
      type = Type.SELECT
    }
    // Affiche une image
    if (name === "imageUrls") {
      type = Type.IMAGE
    }

    return type;

  }

}
