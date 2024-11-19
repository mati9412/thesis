import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';
import { HttpClient } from '@angular/common/http';
import { filter, Observable, of, tap } from 'rxjs';
import { map } from 'rxjs';
import { LabTest } from '../interfaces/lab-test';
import { sources } from '../consts/sources';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private router: Router) {}

  createOrder(order: Order) {
    return this.http.post(sources.ordersSource, order);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<{ [key: string]: Order }>(sources.ordersSource).pipe(
      map((response) => {
        const data: Order[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            data.push({ ...response[key], id: key });
          }
        }
        return data;
      })
    );
  }

  getLabTests(): Observable<LabTest[]> {
    return this.http.get<LabTest[]>(sources.labsSource);
  }

  searchLabTestsByName(query: string): Observable<LabTest[]> {
    if (!query.trim()) {
      return of([]);
    }
    return this.getLabTests().pipe(
      map((data) =>
        data.filter((el) => el.name.toLowerCase().includes(query.toLowerCase()))
      )
    );
  }

  // searchLabTestsByName(query: string): Observable<LabTest[]> {
  //   if (!query.trim()) {
  //     return of([]);
  //   }
  //   return this.http.get<{ [key: string]: LabTest }>(sources.labsSource).pipe(
  //     map((response) => {
  //       const data: LabTest[] = [];
  //       for (const key in response) {
  //         if (response.hasOwnProperty(key)) {
  //           data.push({ ...response[key], id: key });
  //         }
  //       }
  //       return data.filter((el) =>
  //         el.name.toLowerCase().includes(query.toLowerCase())
  //       );
  //     })
  //   );
  // }

  deleteOrder(id: string) {
    return this.http.delete(
      'https://thesis-f6bb3-default-rtdb.europe-west1.firebasedatabase.app/orders/' +
        id +
        '.json'
    );
  }

  updateOrder(order: Order) {
    return this.http.put(
      'https://thesis-f6bb3-default-rtdb.europe-west1.firebasedatabase.app/orders/' +
        order.id +
        '.json',
      order
    );
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }
}
