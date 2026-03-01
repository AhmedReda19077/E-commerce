import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/products/home/home.component';
import { CartComponent } from './features/products/cart/cart.component';
import { ProductsComponent } from './features/products/products/products.component';
import { BrandsComponent } from './features/products/brands/brands.component';
import { CategoriesComponent } from './features/products/categories/categories.component';
import { ProductDetailsComponent } from './features/products/product-details/product-details.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';

export const routes: Routes = [
  { path: "", redirectTo: "register", pathMatch: "full" },
  { path: "register", component: RegisterComponent, title: "Register" },
  { path: "login", component: LoginComponent, title: "Login" },
  { path: "home", component: HomeComponent, title: "Home" },
  { path: "cart", component: CartComponent, title: "Cart" },
  { path: "products", component: ProductsComponent, title: "Products" },
  { path: "brands", component: BrandsComponent, title: "Brands" },
  { path: "categories", component: CategoriesComponent, title: "Categories" },
  { path: "details", component: ProductDetailsComponent, title: "Product Details" },
  { path: "**", component: NotFoundComponent, title: "Not Found" }
];
