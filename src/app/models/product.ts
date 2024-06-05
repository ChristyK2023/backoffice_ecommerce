import { Category } from "./category"

export class Product {
  name: String = ""
  description: String = ""
  more_description: String = ""
  stock: Number = 0
  solde_price: Number = 0
  regular_price: Number = 0
  categories: Array<Category> = []
  imageUrls: Array<String> = []
  brand: String = ""
  currency: String = "EUR"
  status: Boolean = false
  availability: Boolean = false
  // Variation
  options: Object = {} // C'est la taille des articles. Ex: Pointure 41, 42, 43, etc...
  isBestSeller: Boolean = false
  isNewArrival: Boolean = false
  isFeatured: Boolean = false
  isSpecialOffer: Boolean = false
  updated_at: Date|null = null
  created_at: Date|null = null
}
