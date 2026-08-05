import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ScenarioLink {
  path: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="eyebrow">angular-unit-of-work · demo</div>
    <h1>5 scenarios, one <code>trackChanges()</code></h1>
    <p>
      Each page below points <code>trackChanges()</code> at a real
      <code>WritableSignal</code> and edits it directly through the UI — no <code>FormGroup</code
      >, no Reactive Forms. The panel under each form shows the live
      <code>changes()</code> / <code>hasChanges()</code> signals, updating as you type.
    </p>

    <div class="card" style="display: grid; gap: 4px;">
      @for (item of scenarios; track item.path) {
        <a [routerLink]="item.path" class="scenario-link">
          <strong>{{ item.title }}</strong>
          <span>{{ item.description }}</span>
        </a>
      }
    </div>
  `,
  styles: [
    `
      .scenario-link {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 12px 10px;
        border-radius: 8px;
        text-decoration: none;
        color: var(--ink);
      }
      .scenario-link:hover {
        background: var(--panel-alt);
      }
      .scenario-link span {
        color: var(--muted);
        font-size: 13px;
      }
    `,
  ],
})
export class Home {
  readonly scenarios: ScenarioLink[] = [
    {
      path: '/profile',
      title: 'Plain object',
      description: 'A flat Profile — name/email/bio. The simplest case: no arrays, no nesting.',
    },
    {
      path: '/order',
      title: 'Nested object + array (byId)',
      description: 'An Order with header fields plus a line-item array matched by id.',
    },
    {
      path: '/tags',
      title: 'Map / Set',
      description: 'A tag Set and a settings Map — added/removed/modified without JSON.stringify tricks.',
    },
    {
      path: '/reorder',
      title: 'byId vs sequence',
      description: 'The same list, two trackers — see why arrayStrategy changes the diff.',
    },
    {
      path: '/custom-compare',
      title: 'Custom isEqual',
      description: 'A class instance compared by reference vs. by value — same edit, two verdicts.',
    },
  ];
}
