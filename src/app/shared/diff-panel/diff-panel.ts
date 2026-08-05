import { Component, computed, input, signal } from '@angular/core';
import type { ChangeTracker } from 'angular-unit-of-work';

@Component({
  selector: 'app-diff-panel',
  template: `
    <div class="action-bar" style="margin-top: 0;">
      @if (tracker().hasChanges()) {
        <span class="badge dirty">unsaved changes</span>
      } @else {
        <span class="badge clean">up to date</span>
      }
      <span class="spacer"></span>
      <button (click)="tracker().revert()" [disabled]="!tracker().hasChanges()">Revert</button>
      <button class="primary" (click)="tracker().commit()" [disabled]="!tracker().hasChanges()">
        Commit
      </button>
    </div>
    <div class="action-bar" style="margin-top: 10px; margin-bottom: 0;">
      <button
        [class.primary]="view() === 'changes'"
        (click)="view.set('changes')"
        style="font-size: 11.5px; padding: 4px 10px;"
      >
        changes()
      </button>
      <button
        [class.primary]="view() === 'currentValues'"
        (click)="view.set('currentValues')"
        style="font-size: 11.5px; padding: 4px 10px;"
      >
        currentValues()
      </button>
    </div>
    <pre class="diff-json" style="margin-top: 8px;">{{ prettyOutput() }}</pre>
  `,
})
export class DiffPanel {
  readonly tracker = input.required<ChangeTracker<unknown>>();
  readonly view = signal<'changes' | 'currentValues'>('changes');

  readonly prettyOutput = computed(() => {
    const output = this.view() === 'changes' ? this.tracker().changes() : this.tracker().currentValues();
    return output ? JSON.stringify(output, null, 2) : '// no changes';
  });
}
