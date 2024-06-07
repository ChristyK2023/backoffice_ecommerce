import { Pipe, PipeTransform } from '@angular/core';

enum Type {
  INPUT = "INPUT", // => Champ de saisie
  SELECT = "SELECT", // => Champ de sélection
  SELECT_CATEGORIES = "SELECT_CATEGORIES", // => affichage une catégorie
  TEXT = "TEXT", // => Champ de texte
  IMAGE = "IMAGE", // => affichage d'image
  CURRENCY = "CURRENCY", // => affichage d'une devise
  OPTION = "OPTION" // => affichage d'une option
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
    // Affiche une devise
    if (name === "currency") {
      type = Type.CURRENCY
    }
    // Affiche une option
    if (name === "options") {
      type = Type.OPTION
    }
    // Affiche une catégorie
    if (name === "categories") {
      type = Type.SELECT_CATEGORIES
    }

    return type;

  }

}
