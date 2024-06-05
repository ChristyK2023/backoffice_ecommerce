export class Order {
  clientName: String = ""
  priceHT: Number = 0
  priceTTC: Number = 0
  taxe: Number = 0
  total: Number = 0
  quantity: Number = 0
  //order_details: Object = {}
  //position: Number = 0
  updated_at: Date|null = null
  created_at: Date|null = null
}
