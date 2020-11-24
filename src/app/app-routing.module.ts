import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './components/auth/login/login.component';
import { BrandsComponent } from './components/brand/brands/brands.component';
import { CategoriesComponent } from './components/category/categories/categories.component';
import { ProductsByCategoryComponent } from './frontend/components/products-by-category/products-by-category.component';
import { ProductsByCategoryComponent as ProductsByCategoryComponent_backend } from './components/product/products-by-category/products-by-category.component';
import { ProductsComponent } from './components/product/products/products.component';
import { ViewProductComponent } from './components/product/view-product/view-product.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { ProductsSearchedComponent } from './components/product/products-searched/products-searched.component';
import { SubCategoriesComponent } from './components/category/sub-categories/sub-categories.component';
import { SubSubCategoriesComponent } from './components/category/sub-sub-categories/sub-sub-categories.component';
import { MainComponent } from './frontend/layout/main/main.component';
import { MainDetailComponent } from './frontend/layout/main-detail/main-detail.component';
import { ProductsBySubcategoryComponent } from './frontend/components/products-by-subcategory/products-by-subcategory.component';
import { ProductPreviewComponent } from './frontend/components/product-preview/product-preview.component';
import { MainDetail2Component } from './frontend/layout/main-detail2/main-detail2.component';
import { AboutUsComponent } from './frontend/components/about-us/about-us.component';
import { ContactUsComponent } from './frontend/components/contact-us/contact-us.component';
import { InformationComponent } from './components/information/information.component';
import { Main2Component } from './frontend/layout/main2/main2.component';
import { SlideShowComponent } from './components/slideshow/slide-show/slide-show.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: "",
    component: MainComponent
  },
  {
    path: "category/:id",
    component: MainDetailComponent,
    children: [
      {
        path: "", component: ProductsByCategoryComponent
      }
    ]
  },
  {
    path: "subcategory/:id",
    component: MainDetailComponent,
    children: [
      { path: "", component: ProductsBySubcategoryComponent, },
    ]
  },
  {
    path: "searchProduct/:keyword",
    component: MainDetailComponent,
    children: [
      { path: "", component: ProductsBySubcategoryComponent, },
    ]
  },
  {
    path: "product/:id",
    component: MainDetail2Component,
    children: [
      { path: "", component: ProductPreviewComponent, },
    ]
  },
  {
    path: "about-us",
    component: MainDetail2Component,
    children: [
      { path: "", component: AboutUsComponent, },
    ]
  },
  {
    path: "contact-us",
    component: Main2Component,
    children: [
      { path: "", component: ContactUsComponent, },
    ]
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "admin",
    component: DashboardComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: "product-management",
        children: [
          { path: "", redirectTo: "products", pathMatch: "full" },
          { path: "products", component: ProductsComponent },
          { path: "products-by-category", component: ProductsByCategoryComponent_backend },
          { path: "products-by-category/:id", component: ProductsByCategoryComponent_backend },
          { path: "product-detail/:id", component: ViewProductComponent },
          { path: "products/:option/:value", component: ProductsSearchedComponent }
        ]
      },
      {
        path: "brand-management",
        children: [
          { path: "", redirectTo: "brands", pathMatch: "full" },
          { path: "brands", component: BrandsComponent },
        ]
      },
      {
        path: "category-management",
        children: [
          { path: "", redirectTo: "categories", pathMatch: "full" },
          { path: "categories", component: CategoriesComponent },
          { path: "subCategories/:key", component: SubCategoriesComponent },
          { path: "subSubCategories/:key", component: SubSubCategoriesComponent },
        ]
      },
      {
        path: "information-management",
        children: [
          { path: "", redirectTo: "information", pathMatch: "full" },
          { path: "information", component: InformationComponent },
        ]
      },
      {
        path: 'slideshow-management',
        children: [
          { path: "", redirectTo: "slideshow", pathMatch: "full" },
          { path: "slideshow", component: SlideShowComponent },
        ]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
