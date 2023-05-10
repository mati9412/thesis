import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { OrdersComponent } from './components/ordersCreator/orders/orders.component';
import { AppComponent } from './app.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders-list', component: OrdersListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
