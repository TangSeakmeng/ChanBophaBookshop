import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './components/auth/login/login.component';
import { BrandsComponent } from './components/brand/brands/brands.component';
import { CategoriesComponent } from './components/category/categories/categories.component';
import { ProductsByCategoryComponent } from './components/product/products-by-category/products-by-category.component';
import { ProductsComponent } from './components/product/products/products.component';
import { ViewProductComponent } from './components/product/view-product/view-product.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: "product-management",
        children: [
          { path: "", redirectTo: "products", pathMatch: "full" },
          { path: "products", component: ProductsComponent },
          { path: "products-by-category", component: ProductsByCategoryComponent },
          { path: "product-detail/:id", component: ViewProductComponent },
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
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
