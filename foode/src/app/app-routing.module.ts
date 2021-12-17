import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin/menu', 
    component: AdminComponent
  },
  {
    path: 'admin/menu/:id', 
    component: AdminComponent
  },
  {
    path: 'menu', 
    component: MenuComponent
  },
  {
    path: "user",
    component: AppComponent,
    children:[
      {
        path: 'cart', 
        component: CartComponent
      },
      {
        path: 'favourite',
        component: FavouriteComponent
      },
      {
        path: 'order',
        component: OrderComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
