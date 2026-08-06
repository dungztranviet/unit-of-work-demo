import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Hash-based routing: GitHub Pages is a static host with no server-side
    // rewrite, so a hard refresh on /profile would 404. Hash fragments never
    // reach the server, so this works with zero extra infra.
    provideRouter(routes, withHashLocation())
  ]
};
