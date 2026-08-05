import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="shell">
      <nav class="sidebar">
        <div class="brand">
          <div class="eyebrow" style="margin-bottom: 2px;">demo app</div>
          <strong>angular-unit-of-work</strong>
        </div>
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"
          >Overview</a
        >
        <a routerLink="/profile" routerLinkActive="active">Plain object</a>
        <a routerLink="/order" routerLinkActive="active">Nested object + array</a>
        <a routerLink="/tags" routerLinkActive="active">Map / Set</a>
        <a routerLink="/reorder" routerLinkActive="active">byId vs sequence</a>
        <a routerLink="/custom-compare" routerLinkActive="active">Custom isEqual</a>
        <a href="https://github.com/dungztranviet/angular-unit-of-work" target="_blank" class="ext"
          >GitHub repo ↗</a
        >
      </nav>
      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      .shell {
        display: flex;
        min-height: 100vh;
      }
      .sidebar {
        width: 220px;
        flex-shrink: 0;
        background: var(--panel);
        border-right: 1px solid var(--border);
        padding: 20px 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .brand {
        margin-bottom: 18px;
      }
      .brand strong {
        font-size: 14.5px;
      }
      .sidebar a {
        display: block;
        padding: 8px 10px;
        border-radius: 6px;
        color: var(--ink-soft);
        text-decoration: none;
        font-size: 14px;
      }
      .sidebar a:hover {
        background: var(--panel-alt);
      }
      .sidebar a.active {
        background: var(--accent-soft);
        color: var(--accent);
        font-weight: 600;
      }
      .sidebar a.ext {
        margin-top: auto;
        font-family: var(--font-mono);
        font-size: 12px;
        color: var(--muted);
      }
      .content {
        flex: 1;
        min-width: 0;
        padding: 32px 40px;
        max-width: 900px;
      }
    `,
  ],
})
export class App {}
