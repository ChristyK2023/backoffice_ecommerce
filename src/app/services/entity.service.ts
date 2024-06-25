import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private http: HttpClient) { }

  // Renvoie tous les enrégistrements d'une entité
  getDatas(entityName: String) {
    return this.http.get(environment.apiUrl+entityName)
  }
  // Renvoie une donnée selon l'identifiant défini
  getDataById(entityName: String, id: String) {
    return this.http.get(environment.apiUrl+entityName+"/"+id)
  }
  // Renvoie tous les enrégistrements par page
  getDatasByPage(entityName: String, pageNumber: Number = 1, pageLimit: Number = 5) {
    return this.http.get(environment.apiUrl+entityName+"/by/page?pageNumber="+pageNumber+"&pageLimit="+pageLimit)
  }
  // Recherche tous les enrégistrements quelque soit la pqge
  searchDataByPage(entityName: String, query: String, pageNumber: Number = 1, pageLimit: Number = 5) {
    return this.http.get(environment.apiUrl+entityName+"/search?"+query+"&pageNumber="+pageNumber+"&pageLimit="+pageLimit)
  }
  // Ajout de données
  addData(entityName: String, data: any) {
    return this.http.post(environment.apiUrl+entityName, data)
  }
  // Modifie les données
  updateData(entityName: String, entityId: String, data: any) {
    return this.http.put(environment.apiUrl+entityName+"/"+entityId, data)
  }
   // Supprime les données
   deleteData(entityName: String, entityId: String) {
    return this.http.delete(environment.apiUrl+entityName+"/"+entityId)
  }

}
