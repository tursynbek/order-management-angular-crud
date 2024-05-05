import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders?: Order[];
  currentOrder: Order | any = {
  };
  currentIndex = -1;
  title = '';
  displayedColumns: string[] = ['title', 'quantity', 'price', 'actions'];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.retrieveOrders();
  }

  retrieveOrders(): void {
    this.orderService.getAll()
      .subscribe({
        next: (data) => {
          this.orders = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveOrders();
    this.currentOrder = {
    };
    this.currentIndex = -1;
  }

  setActiveOrder(order: Order, index: number): void {
    this.currentOrder = order;
    this.currentIndex = index;
  }

  remove(id: number) {
    this.orderService.delete(id);
    this.refreshList();
  }

  removeAllOrders(): void {
    this.orderService.deleteAll();
    this.refreshList();
  }

  searchTitle(): void {
    this.currentOrder = {
    };
    this.currentIndex = -1;

    this.orderService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.orders = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  getAll() {
    return this.orderService.orders;
  }

}
