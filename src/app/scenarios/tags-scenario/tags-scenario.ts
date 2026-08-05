import { KeyValuePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { trackChanges } from 'angular-unit-of-work';
import { DiffPanel } from '../../shared/diff-panel/diff-panel';

interface TagState {
  tags: Set<string>;
  settings: Map<string, string>;
}

@Component({
  selector: 'app-tags-scenario',
  imports: [DiffPanel, KeyValuePipe],
  template: `
    <div class="eyebrow">scenario 3 · Map / Set</div>
    <h1>Tags &amp; settings</h1>
    <p>
      <code>tags</code> is a real <code>Set&lt;string&gt;</code>, <code>settings</code> a real
      <code>Map&lt;string, string&gt;</code> — no array-of-objects workaround. Both diff as
      added/removed (Set) or added/removed/modified (Map), by key, not by
      <code>JSON.stringify</code>.
    </p>

    <div class="card">
      <h2>Tags</h2>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
        @for (tag of state().tags; track tag) {
          <span class="chip">
            {{ tag }}
            <button (click)="removeTag(tag)" title="Remove tag">✕</button>
          </span>
        }
      </div>
      <div class="action-bar" style="margin-top: 0;">
        <input
          #newTag
          type="text"
          placeholder="new tag"
          style="max-width: 200px;"
          (keydown.enter)="addTag(newTag.value); newTag.value = ''"
        />
        <button (click)="addTag(newTag.value); newTag.value = ''">+ Add tag</button>
      </div>
    </div>

    <div class="card">
      <h2>Settings</h2>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th style="width: 40px;"></th>
          </tr>
        </thead>
        <tbody>
          @for (entry of state().settings | keyvalue; track entry.key) {
            <tr>
              <td><code>{{ entry.key }}</code></td>
              <td>
                <input
                  type="text"
                  [value]="entry.value"
                  (input)="setSetting(entry.key, $any($event.target).value)"
                />
              </td>
              <td>
                <button class="danger" (click)="removeSetting(entry.key)" title="Remove">✕</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
      <div class="action-bar">
        <input #newKey type="text" placeholder="key" style="max-width: 140px;" />
        <input #newValue type="text" placeholder="value" style="max-width: 140px;" />
        <button
          (click)="setSetting(newKey.value, newValue.value); newKey.value = ''; newValue.value = ''"
        >
          + Add setting
        </button>
      </div>
    </div>

    <div class="card">
      <h2>Tracker</h2>
      <app-diff-panel [tracker]="tracker" />
    </div>
  `,
})
export class TagsScenario {
  readonly state = signal<TagState>({
    tags: new Set(['angular', 'signals']),
    settings: new Map([
      ['theme', 'dark'],
      ['locale', 'en'],
    ]),
  });

  readonly tracker = trackChanges(this.state);

  addTag(name: string): void {
    const trimmed = name.trim();
    if (!trimmed) return;
    this.state.update((current) => ({ ...current, tags: new Set([...current.tags, trimmed]) }));
  }

  removeTag(name: string): void {
    this.state.update((current) => {
      const tags = new Set(current.tags);
      tags.delete(name);
      return { ...current, tags };
    });
  }

  setSetting(key: string, value: string): void {
    if (!key.trim()) return;
    this.state.update((current) => {
      const settings = new Map(current.settings);
      settings.set(key, value);
      return { ...current, settings };
    });
  }

  removeSetting(key: string): void {
    this.state.update((current) => {
      const settings = new Map(current.settings);
      settings.delete(key);
      return { ...current, settings };
    });
  }
}
