import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MobxAngularModule } from 'mobx-angular';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { BrandsComponent } from './components/brand/brands/brands.component';
import { AddBrandComponent } from './components/brand/add-brand/add-brand.component';
import { EditBrandComponent } from './components/brand/edit-brand/edit-brand.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { CategoriesComponent } from './components/category/categories/categories.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { ProductsComponent } from './components/product/products/products.component';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { ColorPickerModule } from 'ngx-color-picker';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewProductComponent } from './components/product/view-product/view-product.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/header/header.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ColorCollectionComponent } from './components/product/color-collection/color-collection.component';
import { SliderModule } from 'angular-image-slider';
import { AddProductByCategoryComponent } from './components/product/add-product-by-category/add-product-by-category.component';
import { ProductsByCategoryComponent } from './components/product/products-by-category/products-by-category.component';
import { LoginComponent } from './components/auth/login/login.component';
import { GuardsGuard } from './guards/guards.guard';

@NgModule({
  declarations: [
    AppComponent,
    BrandsComponent,
    AddBrandComponent,
    EditBrandComponent,
    AddCategoryComponent,
    CategoriesComponent,
    EditCategoryComponent,
    AddProductComponent,
    ProductsComponent,
    EditProductComponent,
    ViewProductComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    ProductDetailsComponent,
    ColorCollectionComponent,
    AddProductByCategoryComponent,
    ProductsByCategoryComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SliderModule,

    MobxAngularModule,
    MaterialModule,
    InfiniteScrollModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,

    EditorModule,
    FileUploadModule,
    ColorPickerModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
