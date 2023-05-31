import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from './firebaseConfig/firebaseConfig';
import { OrdersComponent } from './components/ordersCreator/orders/orders.component';
import { FormsModule } from '@angular/forms';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { CartComponent } from './components/ordersCreator/cart/cart.component';
import { TestTubesComponent } from './components/ordersCreator/test-tubes/test-tubes.component';
import localePL from '@angular/common/locales/pl'
import { registerLocaleData } from '@angular/common';
import { TestsFinderComponent } from './components/ordersCreator/tests-finder/tests-finder.component';
import { FinancesComponent } from './components/finances/finances.component';
import { UpdatePersonComponent } from './components/orders-list/update-person/update-person.component';

registerLocaleData(localePL);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrdersComponent,
    OrdersListComponent,
    CartComponent,
    TestTubesComponent,
    TestsFinderComponent,
    FinancesComponent,
    UpdatePersonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
