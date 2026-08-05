import { Component, signal } from '@angular/core';
import { trackChanges } from 'angular-unit-of-work';
import { DiffPanel } from '../../shared/diff-panel/diff-panel';
import type { Profile } from '../../models';

@Component({
  selector: 'app-profile-scenario',
  imports: [DiffPanel],
  template: `
    <div class="eyebrow">scenario 1 · plain object</div>
    <h1>Profile</h1>
    <p>
      One flat <code>WritableSignal&lt;Profile&gt;</code>. Every input below writes straight back
      into the signal with <code>.update()</code> — no <code>FormControl</code> anywhere.
    </p>

    <div class="row">
      <div class="card">
        <h2>Edit</h2>
        <div class="field">
          <label for="name">Name</label>
          <input id="name" type="text" [value]="profile().name" (input)="patch('name', $event)" />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input
            id="email"
            type="text"
            [value]="profile().email"
            (input)="patch('email', $event)"
          />
        </div>
        <div class="field">
          <label for="bio">Bio</label>
          <textarea id="bio" rows="3" (input)="patch('bio', $event)">{{ profile().bio }}</textarea>
        </div>
      </div>

      <div class="card">
        <h2>Tracker</h2>
        <app-diff-panel [tracker]="tracker" />
      </div>
    </div>
  `,
})
export class ProfileScenario {
  readonly profile = signal<Profile>({
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    bio: 'Mathematician & writer.',
  });

  readonly tracker = trackChanges(this.profile);

  patch<K extends keyof Profile>(key: K, event: Event): void {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.profile.update((current) => ({ ...current, [key]: value }));
  }
}
