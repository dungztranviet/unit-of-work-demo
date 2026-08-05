import { Component, signal } from '@angular/core';
import { trackChanges } from 'angular-unit-of-work';
import { DiffPanel } from '../../shared/diff-panel/diff-panel';
import type { Order, OrderLine } from '../../models';

let nextLineId = 100;

@Component({
  selector: 'app-order-scenario',
  imports: [DiffPanel],
  template: `
    <div class="eyebrow">scenario 2 · nested object + array</div>
    <h1>Order</h1>
    <p>
      Header fields (<code>customerName</code>, <code>note</code>) plus a
      <code>lines: OrderLine[]</code> array matched by <code>id</code> — the default
      <code>idKey</code>. Add, remove, or edit a line and watch the diff key itself by that line's
      id.
    </p>

    <div class="card">
      <h2>Header</h2>
      <div class="field">
        <label for="customer">Customer</label>
        <input
          id="customer"
          type="text"
          [value]="order().customerName"
          (input)="patchHeader('customerName', $event)"
        />
      </div>
      <div class="field">
        <label for="note">Note</label>
        <input id="note" type="text" [value]="order().note" (input)="patchHeader('note', $event)" />
      </div>
    </div>

    <div class="card">
      <h2>Lines</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th style="width: 90px;">Qty</th>
            <th style="width: 110px;">Price</th>
            <th style="width: 40px;"></th>
          </tr>
        </thead>
        <tbody>
          @for (line of order().lines; track line.id) {
            <tr>
              <td>
                <input
                  type="text"
                  [value]="line.product"
                  (input)="patchLine(line.id, 'product', $event)"
                />
              </td>
              <td>
                <input
                  type="number"
                  [value]="line.qty"
                  (input)="patchLine(line.id, 'qty', $event)"
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  [value]="line.price"
                  (input)="patchLine(line.id, 'price', $event)"
                />
              </td>
              <td>
                <button class="danger" (click)="removeLine(line.id)" title="Remove line">✕</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
      <div class="action-bar">
        <button (click)="addLine()">+ Add line</button>
      </div>
    </div>

    <div class="card">
      <h2>Tracker</h2>
      <app-diff-panel [tracker]="tracker" />
    </div>
  `,
})
export class OrderScenario {
  readonly order = signal<Order>({
    customerName: 'Acme Corp',
    note: '',
    lines: [
      { id: 1, product: 'Widget', qty: 2, price: 9.99 },
      { id: 2, product: 'Gadget', qty: 1, price: 19.99 },
    ],
  });

  readonly tracker = trackChanges(this.order);

  patchHeader<K extends 'customerName' | 'note'>(key: K, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.order.update((current) => ({ ...current, [key]: value }));
  }

  patchLine<K extends keyof OrderLine>(id: number, key: K, event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    const value = (key === 'qty' || key === 'price' ? Number(raw) : raw) as OrderLine[K];
    this.order.update((current) => ({
      ...current,
      lines: current.lines.map((line) => (line.id === id ? { ...line, [key]: value } : line)),
    }));
  }

  addLine(): void {
    const id = nextLineId++;
    this.order.update((current) => ({
      ...current,
      lines: [...current.lines, { id, product: 'New item', qty: 1, price: 0 }],
    }));
  }

  removeLine(id: number): void {
    this.order.update((current) => ({
      ...current,
      lines: current.lines.filter((line) => line.id !== id),
    }));
  }
}
