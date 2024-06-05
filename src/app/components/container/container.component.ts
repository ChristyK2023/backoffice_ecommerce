import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterEvent } from '@angular/router';
import { EntityService } from '../../services/entity.service';
import { getEntityPorperties } from '../../helpers/helpers';
import { routes } from '../../helpers/routes';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent implements OnInit{

  pagePath: string = ""
  pageName: string = ""
  pageNumber: number = 1
  pageLimit: number = 5
  datas: any;
  result: any;
  entityNames: Array<String> = []; // Propriétés qu'on souhaite afficher
  entityNamesAll: Array<String> = []; // Affiche toutes les propriétés
  isLoading: Boolean = true;
  routes: Array<any> = routes
  query: String = ""
  searchTag: String = ""
  displaySelectionBox: Boolean = false;
  imageUrl: String | null = null

  constructor (
    private route: ActivatedRoute,
    private entityService: EntityService
  ) { }

  ngOnInit(): void {
    this.initComp()
    this.getDatasByPage()

  }

  getValue(data: any, name: String) {
    const index: any = name
    return data[index]
  }

  initComp(){

    this.pagePath = this.route.snapshot.url[0]?.path || "product"

    const routeObject:any = this.routes.filter(route => route.path === "/"+this.pagePath)
    if (routeObject[0]) {
      this.pageName = routeObject[0]?.name
    }

    // Récupere les proprités de l'entité sur lequel on se trouve
    this.entityNamesAll = getEntityPorperties(this.pagePath)
    const localData = this.getLocalData(this.pagePath)
    //console.log({localData});

    this.entityNames = localData ? localData?.entityNames : [this.entityNamesAll[0]]

  }

  setPage(page: number) {
    this.pageNumber = page
    this.getDatasByPage()
  }

  setPageLimit(event: any) {

    const { name, value } = event.target
    const pageLimit = parseInt(value)

    if (!isNaN(pageLimit)) {
      this.pageLimit = pageLimit
      this.getDatasByPage()
    }
  }

  searchData(data: any) {
    this.query = ""
    if (data) {
      this.searchTag = data.value
      this.query += data.name +"="+ data.value
    }
    this.getDatasByPage()
  }

  getDatasByPage() {

    if (this.query) {

      this.entityService.searchDataByPage(this.pagePath, this.query, this.pageNumber, this.pageLimit).subscribe({

        next: (data: any)=>{

          const { isSuccess, results } = data
          if (isSuccess && results) {
            this.isLoading = false
            this.datas = results
            this.result = data
          }else{
            // Gestion des erreurs
          }

        },
        error: (error: any)=>{
          // Gestion des erreurs
          console.log(error);
        },

      })

    } else {

      this.entityService.getDatasByPage(this.pagePath, this.pageNumber, this.pageLimit).subscribe({

        next: (data: any)=>{

          const { isSuccess, results } = data
          if (isSuccess && results) {
            this.isLoading = false
            this.datas = results
            this.result = data
          }else{
            // Gestion des erreurs
          }

        },
        error: (error: any)=>{
          // Gestion des erreurs
          console.log(error);
        },

      })

    }

  }

  setDisplaySelectionBox() {
    this.displaySelectionBox = !this.displaySelectionBox
  }

  setEntityNames(event: any, name: String) {

    const { checked } = event.target

    if (checked) {
      if (!this.entityNames.includes(name)) {
        const oldValue = this.entityNames
        oldValue.push(name)
        this.entityNames = []
        this.entityNames = this.entityNamesAll.filter(name => oldValue.includes(name))
      }
    }else{
      this.entityNames = this.entityNames.filter(
        (entityName: String)=>entityName !== name
      )
    }

    const index : any = this.pagePath
    let data: any = {"entityNames": this.entityNames}

    this.saveLocalData(index, data)

  }

  setImageView(name: any, data: any) {

    if (!name && !data) {
      this.imageUrl = null
    }

    if (name === "imageUrls") {
      this.imageUrl = data["imageUrls"][0]
      //console.log(this.imageUrl);
    }else{
      this.imageUrl = null
    }

  }

  saveLocalData(key: string, value: string){
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }

  getLocalData(key: any): any {
    if (window.localStorage) {
      const value: any = window.localStorage.getItem(key)
      return JSON.parse(value)
    }
  }


}
