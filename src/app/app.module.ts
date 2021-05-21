import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MobxAngularModule } from 'mobx-angular';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { EditorModule } from 'primeng/editor';
import { SkeletonModule } from 'primeng/skeleton';
import { FileUploadModule } from 'primeng/fileupload';
import { ColorPickerModule } from 'ngx-color-picker';

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
import { ProductsSearchedComponent } from './components/product/products-searched/products-searched.component';
import { SubCategoriesComponent } from './components/category/sub-categories/sub-categories.component';
import { SubSubCategoriesComponent } from './components/category/sub-sub-categories/sub-sub-categories.component';
import { AddSubCategoryComponent } from './components/category/add-sub-category/add-sub-category.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { ResultDialogComponent } from './shared/result-dialog/result-dialog.component';
import { EditSubCategoryComponent } from './components/category/edit-sub-category/edit-sub-category.component';
import { HomeComponent } from './frontend/components/home/home.component';
import { ProductPreviewComponent } from './frontend/components/product-preview/product-preview.component';
import { MainComponent } from './frontend/layout/main/main.component';
import { FrontendHeaderComponent } from './frontend/layout/frontend-header/frontend-header.component';
import { NavSidebarComponent } from './frontend/layout/nav-sidebar/nav-sidebar.component';
import { ImageSlideShowComponent } from './frontend/components/image-slide-show/image-slide-show.component';
import { FrontendFooterComponent } from './frontend/layout/frontend-footer/frontend-footer.component';
import { ShowProductByCategoryComponent } from './frontend/components/show-product-by-category/show-product-by-category.component';
import { MainDetailComponent } from './frontend/layout/main-detail/main-detail.component';
import { FrontendNavigationComponent } from './frontend/layout/frontend-navigation/frontend-navigation.component';
import { ProductsBySubcategoryComponent } from './frontend/components/products-by-subcategory/products-by-subcategory.component';
import { NavSidebarDetailComponent } from './frontend/layout/nav-sidebar-detail/nav-sidebar-detail.component';
import { FrontendNavigationDetailComponent } from './frontend/layout/frontend-navigation-detail/frontend-navigation-detail.component';
import { ProductsByCategoryComponent as FrontendProductsByCategoryComponent } from './frontend/components/products-by-category/products-by-category.component';
import { MainDetail2Component } from './frontend/layout/main-detail2/main-detail2.component';
import { ContactUsComponent } from './frontend/components/contact-us/contact-us.component';
import { AboutUsComponent } from './frontend/components/about-us/about-us.component';
import { AgmCoreModule } from '@agm/core';
import { InformationComponent } from './components/information/information.component';
import { Main2Component } from './frontend/layout/main2/main2.component';
import { FrontendNavigation2Component } from './frontend/layout/frontend-navigation2/frontend-navigation2.component';
import { FacebookModule } from 'ngx-facebook';
import { ScrollableDirective } from './directive/scrollable.directive';
import { SlideShowComponent } from './components/slideshow/slide-show/slide-show.component';
import { AddSlideShowComponent } from './components/slideshow/add-slide-show/add-slide-show.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AddIconPackageComponent } from './components/category/add-icon-package/add-icon-package.component';
import { FateMenuDialogComponent } from './frontend/components/fate-menu-dialog/fate-menu-dialog.component';
import { FateMenuDialog2Component } from './frontend/components/fate-menu-dialog2/fate-menu-dialog2.component';
import { NgPipesModule } from 'ngx-pipes';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ListingAllProductsComponent } from './frontend/components/listing-all-products/listing-all-products.component';

export function playerFactory() {
  return player;
}

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

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
    ProductsSearchedComponent,
    SubCategoriesComponent,
    SubSubCategoriesComponent,
    AddSubCategoryComponent,
    ConfirmDialogComponent,
    ResultDialogComponent,
    EditSubCategoryComponent,
    HomeComponent,
    ProductPreviewComponent,
    MainComponent,
    FrontendHeaderComponent,
    NavSidebarComponent,
    ImageSlideShowComponent,
    FrontendFooterComponent,
    ShowProductByCategoryComponent,
    MainDetailComponent,
    FrontendNavigationComponent,
    ProductsBySubcategoryComponent,
    NavSidebarDetailComponent,
    FrontendNavigationDetailComponent,
    FrontendProductsByCategoryComponent,
    MainDetail2Component,
    ContactUsComponent,
    AboutUsComponent,
    InformationComponent,
    Main2Component,
    FrontendNavigation2Component,
    ScrollableDirective,
    SlideShowComponent,
    AddSlideShowComponent,
    PageNotFoundComponent,
    AddIconPackageComponent,
    FateMenuDialogComponent,
    FateMenuDialog2Component,
    ListingAllProductsComponent
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
    SkeletonModule,
    ColorPickerModule,
    HttpClientModule,
    CommonModule,
    SwiperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPMV9gA-dyAAb2J-N43BV36AAEAIyf4Fs'
    }),
    FacebookModule.forRoot(),
    LottieModule.forRoot({ player: playerFactory }),
    NgPipesModule,
    LazyLoadImageModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
