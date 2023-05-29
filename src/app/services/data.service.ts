import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Person } from '../interfaces/person';
import { Observable, of, tap } from 'rxjs';
import { map } from 'rxjs';
import { LabTest } from '../interfaces/lab-test';
import { sources } from '../consts/sources';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  source: string =
    'https://thesis-f6bb3-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient) {}

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
    return this.http.get<{ [key: string]: LabTest }>(sources.labsSource).pipe(
      map((response) => {
        const data: LabTest[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            data.push({ ...response[key], id: key });
          }
        }
        return data;
      })
    );
  }

  searchLabTestsByName(query: string): Observable<LabTest[]> {
    if (!query.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<{ [key: string]: LabTest }>(sources.labsSource).pipe(
      map((response) => {
        const data: LabTest[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            data.push({ ...response[key], id: key });
          }
        }
        return data.filter((el) =>
          el.name.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  }
}

// getPersons(): Observable<Person[]> {
//   return this.http.get<Person[]>(this.source + 'persons.json').pipe(
//     map((response) => {
//       const data = [];
//       for (const key in response) {
//         if (response.hasOwnProperty(key)) {
//           data.push({ id: key, ...response[key] });
//         }
//       }
//       return data;
//     })
//   );
// }

// getPersons(): Observable<Person[]> {
//   return this.http.get<{[key: string]: Person}>(this.source + 'persons.json').pipe(
//     map((responseData) => Object.values(responseData))
//   ).pipe(tap(console.log));
// }

// searchPerson(term: string): Observable<Person[]> {
//   if (!term.trim()) {
//     // if not search term, return empty hero array.
//     return of([]);
//   }
//   return this.http
//     .get<{ [key: string]: Person }>(
//       `${this.source}persons/?id=${term}.json'`
//     )
//     // .pipe(
//     //   map((response) => {
//     //     const data: Person[] = [];
//     //     for (const key in response) {
//     //       if (response.hasOwnProperty(key)) {
//     //         data.push({ ...response[key], id: key });
//     //       }
//     //     }
//     //     return data;
//     //   })
//     // )
//     .pipe(tap(console.log));
// }
