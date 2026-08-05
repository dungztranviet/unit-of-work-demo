import { Component, signal } from '@angular/core';
import { trackChanges } from 'angular-unit-of-work';
import { DiffPanel } from '../../shared/diff-panel/diff-panel';
import type { ReorderItem } from '../../models';

@Component({
  selector: 'app-reorder-scenario',
  imports: [DiffPanel],
  template: `
    <div class="eyebrow">scenario 4 · arrayStrategy</div>
    <h1>byId vs sequence</h1>
    <p>
      One signal, <strong>two independent trackers</strong> — one with the default
      <code>arrayStrategy: "byId"</code>, one with <code>"sequence"</code>. Move an item and watch
      the same edit produce two very different diffs.
    </p>

    <div class="card">
      <h2>List</h2>
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th style="width: 140px;"></th>
          </tr>
        </thead>
        <tbody>
          @for (item of items(); track item.id; let i = $index) {
            <tr>
              <td>
                <input
                  type="text"
                  [value]="item.label"
                  (input)="rename(item.id, $any($event.target).value)"
                />
              </td>
              <td style="white-space: nowrap;">
                <button (click)="move(i, -1)" [disabled]="i === 0" title="Move up">↑</button>
                <button (click)="move(i, 1)" [disabled]="i === items().length - 1" title="Move down">
                  ↓
                </button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>

    <div class="row">
      <div class="card">
        <h2><code>arrayStrategy: "byId"</code> (default)</h2>
        <p style="margin-bottom: 10px;">
          Matches purely by <code>id</code> — position never enters the comparison at all. Move
          items around all you like: as long as every id and every field still matches, this
          tracker reports <em>zero</em> changes. It only reacts to fields actually changing, or
          items being added/removed.
        </p>
        <app-diff-panel [tracker]="trackerById" />
      </div>
      <div class="card">
        <h2><code>arrayStrategy: "sequence"</code></h2>
        <p style="margin-bottom: 10px;">
          Aligns by content (LCS) — order matters here. Move one item and this tracker reports it
          as one removed + one added, even though nothing about the item itself changed. Items
          that keep their relative order to each other stay out of the diff.
        </p>
        <app-diff-panel [tracker]="trackerSequence" />
      </div>
    </div>
  `,
})
export class ReorderScenario {
  readonly items = signal<ReorderItem[]>([
    { id: 1, label: 'A' },
    { id: 2, label: 'B' },
    { id: 3, label: 'C' },
    { id: 4, label: 'D' },
  ]);

  readonly trackerById = trackChanges(this.items, { idKey: 'id' });
  readonly trackerSequence = trackChanges(this.items, { arrayStrategy: 'sequence' });

  rename(id: number, label: string): void {
    this.items.update((current) => current.map((item) => (item.id === id ? { ...item, label } : item)));
  }

  move(index: number, delta: number): void {
    this.items.update((current) => {
      const next = [...current];
      const target = index + delta;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target]!, next[index]!];
      return next;
    });
  }
}
