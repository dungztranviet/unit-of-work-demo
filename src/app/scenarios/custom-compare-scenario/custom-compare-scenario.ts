import { Component, signal } from '@angular/core';
import { trackChanges } from 'angular-unit-of-work';
import { DiffPanel } from '../../shared/diff-panel/diff-panel';
import { Money } from '../../models';

interface PriceState {
  price: Money;
}

@Component({
  selector: 'app-custom-compare-scenario',
  imports: [DiffPanel],
  template: `
    <div class="eyebrow">scenario 5 · custom isEqual</div>
    <h1>Reference vs. value equality</h1>
    <p>
      <code>price</code> is a <code>Money</code> class instance — not a plain object, not one of
      the built-in types <code>diff()</code> knows about. By default it's compared by
      <em>reference</em> (<code>Object.is</code>). One tracker below uses that default; the other
      supplies an <code>isEqual</code> that compares by <code>.cents</code> instead.
    </p>

    <div class="card">
      <h2>Current price</h2>
      <p style="margin-bottom: 10px;">
        <code>{{ state().price.cents }}</code> cents
      </p>
      <div class="action-bar" style="margin-top: 0;">
        <button (click)="setSameValueNewInstance()">
          Set to same value, <strong>new instance</strong>
        </button>
        <button (click)="setDifferentValue()">Set to a genuinely different price</button>
      </div>
    </div>

    <div class="row">
      <div class="card">
        <h2>Default — reference equality</h2>
        <p style="margin-bottom: 10px;">
          <code>trackChanges(state)</code>, no options. A new <code>Money</code> instance with the
          <em>same</em> <code>.cents</code> still counts as "changed."
        </p>
        <app-diff-panel [tracker]="trackerDefault" />
      </div>
      <div class="card">
        <h2>Custom — value equality</h2>
        <p style="margin-bottom: 10px;">
          <code>isEqual</code> compares <code>.cents</code>. Same value, new instance → no diff.
        </p>
        <app-diff-panel [tracker]="trackerCustom" />
      </div>
    </div>
  `,
})
export class CustomCompareScenario {
  readonly state = signal<PriceState>({ price: new Money(1000) });

  readonly trackerDefault = trackChanges(this.state);

  readonly trackerCustom = trackChanges(this.state, {
    isEqual: (a, b) => (a instanceof Money && b instanceof Money ? a.cents === b.cents : Object.is(a, b)),
  });

  setSameValueNewInstance(): void {
    const cents = this.state().price.cents;
    this.state.update((current) => ({ ...current, price: new Money(cents) }));
  }

  setDifferentValue(): void {
    const cents = this.state().price.cents + 500;
    this.state.update((current) => ({ ...current, price: new Money(cents) }));
  }
}
