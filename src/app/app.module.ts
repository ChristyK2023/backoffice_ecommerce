import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AsideComponent } from './components/aside/aside.component';
import { ContainerComponent } from './components/container/container.component';
import { Error404Component } from './components/error404/error404.component';
import { EntityComponent } from './components/forms/entity/entity.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { FormatNamePipe } from './pipes/format-name.pipe';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatTagPipe } from './pipes/format-tag.pipe';
import { FormatValuePipe } from './pipes/format-value.pipe';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import { DataManagerComponent } from './components/data-manager/data-manager.component';
import { FormatValueImagePipe } from './pipes/format-value-image.pipe';
import { EntityFormComponent } from './components/entity-form/entity-form.component';
import { FormatFormValuePipe } from './pipes/format-form-value.pipe';
import { FormatTypePipe } from './pipes/format-type.pipe';
import { ImageViewComponent } from './components/image-view/image-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    ContainerComponent,
    Error404Component,
    EntityComponent,
    LoadingComponent,
    ModalComponent,
    PaginationComponent,
    FormatNamePipe,
    SearchFormComponent,
    FormatTagPipe,
    FormatValuePipe,
    ImagePreviewComponent,
    DataManagerComponent,
    FormatValueImagePipe,
    EntityFormComponent,
    FormatFormValuePipe,
    FormatTypePipe,
    ImageViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
