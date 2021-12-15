import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent
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
    path: "user",
    component: AppComponent,
    children:[
      {
        path: 'menu', 
        component: MenuComponent
      },
      {
        path: 'cart', 
        component: CartComponent
      },
      {
        path: 'favourite',
        component: FavouriteComponent
      },
    ]
  },
  {
    path: 'contact', 
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
