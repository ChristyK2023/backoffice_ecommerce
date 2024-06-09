import { LoadingComponent } from './../loading/loading.component';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '../../helpers/routes';
import { actions } from '../../helpers/actions';
import { formateTCamelCase } from '../../helpers/util';
import { EntityService } from '../../services/entity.service';
import { getEntityPorperties } from '../../helpers/helpers';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  styleUrl: './data-manager.component.css'
})
export class DataManagerComponent {

  entity: any;
  entityId: any;
  pageName: any;
  action: any;
  entityNamesAll: any;
  result: any;
  data: any;
  routes: Array<any> = routes
  actions: Array<String> = actions

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private entityService: EntityService
  ) {}

  ngOnInit() {

    window.scrollTo(0,0)

    const urls = this.route.snapshot.url
    if (urls.length < 3) {
      this.router.navigate(["/error"])
    }
    this.entity = urls[0]?.path
    this.entityId = urls[1].path
    this.action = urls[2].path

    const isEntityExist = routes.filter(
      (route: any)=> route.path === "/"+this.entity
    )

    if (!isEntityExist || !isEntityExist[0]) {
      this.router.navigate(["/error"])
    }

    if (!this.actions.includes(this.action)) {
      this.router.navigate(["/error"])
    }

    const routeObject:any = this.routes.filter(route => route.path === "/"+this.entity)

    if (routeObject[0]) {
      this.pageName = formateTCamelCase(this.action) +" "+ routeObject[0]?.single
    }

    // On récupere les champs des différentes entités
    this.entityNamesAll = getEntityPorperties(this.entity)
    this.getDataById()
    //console.log(this.entity, this.entityId, this.action);

  }

  getDataById() {
    this.entityService.getDataById(this.entity, this.entityId).subscribe({
      next: (value: any)=>{
        console.log(value);
        this.result = value
        this.data = value.result
      },
      error: (error: any)=> {
        console.log(error);

      }
    })
  }

  getValue(name: any){
    return this.data[name]
  }

  handleFormChange(data: any) {

    let formData: any = {}
    const entity: any = this.entity

    if (data?.files && !data?.files?.length) {
      // Upload File
      //On supprime le file
      const files = data.files
      delete data.files

      //On ajoute les données
      formData = new FormData()
      formData.append([entity], JSON.stringify(data))

      // ADD or UPDATE
      files.filter((fileItem: any) => fileItem.action !== "DELETE").forEach((fileItem: any) => {
        formData.append("file", fileItem.file)
      })

      // DELETE
      const deleteFiles = files.filter((fileItem: any) => ["DELETE", "UPDATE"].includes(fileItem.action))
      .map((fileItem: any) => fileItem.oldImage)
      formData.append("deleteFiles", JSON.stringify(deleteFiles))

    }else{
      // Upload Normal
      formData[entity] = data
    }

    // SAVE DATA
    if (formData) {
      console.log(formData);

      this.entityService.updateData(this.entity, this.entityId, formData).subscribe({
        next: (value: any)=>{
          console.log(value);

        },
      })
    }

  }

}
