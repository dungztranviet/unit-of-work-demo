import { Component, computed, input } from '@angular/core';
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
    <pre class="diff-json" style="margin-top: 12px;">{{ prettyChanges() }}</pre>
  `,
})
export class DiffPanel {
  readonly tracker = input.required<ChangeTracker<unknown>>();

  readonly prettyChanges = computed(() => {
    const changes = this.tracker().changes();
    return changes ? JSON.stringify(changes, null, 2) : '// no changes';
  });
}
