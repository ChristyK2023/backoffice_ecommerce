import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EntityService } from '../../services/entity.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.css',
})
export class EntityFormComponent {
  @Input() entityNames: Array<string> = [];
  @Input() formType: any;
  @Input() entity: any;
  @Input() data: any;

  form: any;
  formData: any = {};
  categories: any;
  categoriesSelected: any;
  files: any;
  name: any[] = [];

  @Output() formEmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private entityService: EntityService) {}

  async ngOnInit() {
    console.log({ entityNames: this.entityNames });

    this.entityNames = this.entityNames.filter((name: String) => {
      if (name === 'created_at') {
        return false;
      }
      if (name === 'updated_at') {
        return false;
      }
      return true;
    });
    // On vérifie si categories est inclu dans entityNames
    if (this.entityNames.includes('categories')) {
      const data: any = await lastValueFrom(
        this.entityService.getDatas('category')
      );
      console.log(data);

      this.categoriesSelected = this.data['categories'];
      this.categories = data.results;
    }

    console.log(this.entityNames);

    this.initForm();
    this.initSelect();
  }

  initForm() {
    let formObject = {};
    this.entityNames.forEach((name: any) => {
      const value = this.data[name];
      formObject = {
        ...formObject,
        [name]: this.fb.control(value, Validators.required),
      };
    });
    this.form = this.fb.group(formObject);
  }
  // Initialise le select
  initSelect() {
    /**
     *Je gere l'intégration du select2 (C'est une librairie externe)
     *Cette libraire sert a designer une liste de sélection
     */
    const WD: any = window;
    const $ = WD.jQuery;
    const self = this;

    $(document).ready(function () {
      $('.select-categories').select2();
      $('.single-select').select2();
      $('.select-categories').on('select2:select', function (event: any) {
        const values = $('.select-categories').select2('val');
        self.formData['categories'] = values;
      });

      $('.select-categories').select2();
      $('.select-categories').on('select2:unselect', function (event: any) {
        const values = $('.select-categories').select2('val');
        self.formData['categories'] = values;
      });

      $('.single-select').on('select2:select', function (event: any) {
        const { name, value } = event.target;
        self.formData[name] = value;
      });
    });
  }

  // Fonction qui soumet le formulaire
  handleSubmit() {
    /**
     * Options
     * Categories
     * Images
     */

    const data = { ...this.form.value, ...this.formData };

    if (this.files?.length) {
      data['files'] = this.files;
    }

    this.formEmit.emit({ ...data });
  }

  handleUpdateOption(data: any) {
    this.formData['options'] = data;
  }

  handleChangeFile(files: any) {
    this.files = files;
  }
}
