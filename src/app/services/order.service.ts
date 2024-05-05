import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Order} from '../models/Order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  orders: Order[] = [
    {
      id: 1,
      title: 'Order 1',
      quantity: 1,
      price: 100
    },
    {
      id: 2,
      title: 'Order 2',
      quantity: 2,
      price: 200
    },
    {
      id: 3,
      title: 'Order 3',
      quantity: 3,
      price: 300
    }
  ];

  getAll(): Observable<Order[]> {
    return of(this.orders);
  }

  getLastId(): number {
    if (this.orders.length === 0) {
      return 0;
    }
    return this.orders[this.orders.length - 1].id;
  }

  get(id: number): Order {
    const order = this.orders.find((order) => order.id == id);
    if (order) {
      return order;
    } else {
      return {
        id: 0,
        title: '',
        quantity: 0,
        price: 0
      };
    }
  }

  create(data: any) {
    this.orders.push(data);
  }

  update(data: Order) {
    this.orders = this.orders.map((order) => {
      if (order.id === data.id) {
        return data;
      }
      return order;
    });
  }

  delete(id: any) {
    this.orders = this.orders.filter((order) => order.id !== id);
  }

  deleteAll() {
    this.orders = [];
  }

  findByTitle(title: any): Observable<Order[]> {
    return of(this.orders.filter((order) => order.title.includes(title)));
  }
}
