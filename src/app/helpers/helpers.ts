import { Category } from "../models/category";
import { Contact } from "../models/contact";
import { Order } from "../models/order";
import { Product } from "../models/product";
import { User } from "../models/user";

export const getEntityPorperties = (entity: String): Array<String> => {

  let results: any = []
  let entityClass: any;

  if (entity=="product") {
    entityClass = new Product()
  }

  if (entity=="category") {
    entityClass = new Category()
  }

  if (entity=="user") {
    entityClass = new User()
  }

  if (entity=="order") {
    entityClass = new Order()
  }

  if (entity=="contact") {
    entityClass = new Contact()
  }

  if (entityClass) {
    // Récupere toutes les propretés du modele
    results = Object.keys(entityClass)
  }

  return results
}
