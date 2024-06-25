import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterEvent } from '@angular/router';
import { EntityService } from '../../services/entity.service';
import { getEntityPorperties } from '../../helpers/helpers';
import { routes } from '../../helpers/routes';
import { Subscription, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent implements OnInit, OnDestroy{

  entity: String = ""
  //pagePath: string = ""
  pageName: string = ""
  pageNumber: number = 1
  pageLimit: number = 5
  datas: any;
  result: any;
  entityNames: Array<String> = []; // Propriétés qu'on souhaite afficher
  entityNamesAll: Array<String> = []; // Affiche toutes les propriétés
  groupe: Array<String> = []; // Contient tous les elements a supprimer
  isLoading: Boolean = true;
  routes: Array<any> = routes
  query: String = ""
  searchTag: String = ""
  modalTitle: String = ""
  modalContent: String = ""
  entityDelete: any
  isDeleting: Boolean = false
  displaySelectionBox: Boolean = false;
  imageUrl: String | null = null
  getDatasByPage$ = new Subscription()
  searchDataByPage$ = new Subscription()


  constructor (
    private route: ActivatedRoute,
    private entityService: EntityService
  ) {

    }

  ngOnInit(): void {
    this.initComp()
    this.getDatasByPage()
  }

  getValue(data: any, name: any) {
    const index: any = name
    return data[index]
  }

  initComp(){

    this.entity = this.route.snapshot.url[0]?.path || "product"

    // Récupere le titre de la page
    const routeObject:any = this.routes.filter(route => route.path === "/"+this.entity)
    if (routeObject[0]) {
      this.pageName = routeObject[0]?.name
    }

    // Récupere les proprités de l'entité sur lequel on se trouve
    this.entityNamesAll = getEntityPorperties(this.entity)
    const localData = this.getLocalData(this.entity)
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

      this.searchDataByPage$ = this.entityService.searchDataByPage(this.entity, this.query, this.pageNumber, this.pageLimit).subscribe({

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

      this.getDatasByPage$ = this.entityService.getDatasByPage(this.entity, this.pageNumber, this.pageLimit).subscribe({

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

    const index : any = this.entity
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

  handleDelete(data: any) {
    const index: any = this.entityNames[0]
    if (data) {
      // Nous sommes dans le cas ou on veut supprimer une ligne
      const name = data[index]
      this.isDeleting = true
      this.entityDelete = data
      this.modalTitle = "Confirm Delete"
      this.modalContent = `<p>Do you want to delete this ${this.entity} : <strong>${name}</strong> ?</p>`
    } else {
      // Nous sommes dans le cas de la suppression Groupé
      if (this.groupe.length) {
        this.isDeleting = true
        this.entityDelete = null
        this.modalTitle = "Confirm Delete"
        this.modalContent = `
        <p>Do you want to delete ${this.groupe.length} item(s) :  ?</p>`
        this.modalContent += `<ul>`
        this.groupe.forEach((id: String) => {
          const item = this.datas.filter((data: any) => data._id === id)[0]
          const name = item[index]
          this.modalContent += `<li> ${name} </li>`
        })
        this.modalContent += `</ul>`
      }
    }

  }

  handleCloseModal(event: any) {
    this.isDeleting = false
    this.entityDelete = null
    this.modalTitle = ""
    this.modalContent = ""
  }

  async handleConfirmModal(event: any) {
    ///
    if (this.entityDelete) {
      this.entityService.deleteData(this.entity, this.entityDelete._id).subscribe({
        next: (value: any) => {
          console.log(value);
          this.getDatasByPage()
        },
        error: (error) => {
          console.log(error);

        }
      })
      this.isDeleting = false
      this.entityDelete = null
    }else{
      if (this.groupe.length) {
        await Promise.all(
          this.groupe.map(async (id) => {
            await lastValueFrom(this.entityService.deleteData(this.entity, id))
          })
        )

        this.groupe = []
        this.getDatasByPage()
      }
    }

  }

  handleGroupe(event: any, id: String) {
    const { checked } = event.target
    if (checked) {
      // Cocher
      if (!this.groupe.includes(id)) {
        this.groupe.push(id)
      }
    } else {
      // Décocher
      this.groupe = this.groupe.filter((item: String) => item !== id)
    }
    console.log(this.groupe);
  }

  groupeAll(event: any) {
    const { checked } = event.target
    if (checked) {
      // Cocher
      this.groupe =  this.datas.map((data: any) => data._id)
    } else {
      // Décocher
      this.groupe = []
    }
    console.log(this.groupe);
  }


  ngOnDestroy() {
    this.getDatasByPage$.unsubscribe()
    this.searchDataByPage$.unsubscribe()
  }


}
