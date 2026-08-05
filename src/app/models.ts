export interface Profile {
  name: string;
  email: string;
  bio: string;
}

export interface OrderLine {
  id: number;
  product: string;
  qty: number;
  price: number;
}

export interface Order {
  customerName: string;
  note: string;
  lines: OrderLine[];
}

export interface ReorderItem {
  id: number;
  label: string;
}

export class Money {
  constructor(public cents: number) {}
}
