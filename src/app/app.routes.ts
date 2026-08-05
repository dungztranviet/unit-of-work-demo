import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./scenarios/home/home').then((m) => m.Home),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./scenarios/profile-scenario/profile-scenario').then((m) => m.ProfileScenario),
  },
  {
    path: 'order',
    loadComponent: () =>
      import('./scenarios/order-scenario/order-scenario').then((m) => m.OrderScenario),
  },
  {
    path: 'tags',
    loadComponent: () =>
      import('./scenarios/tags-scenario/tags-scenario').then((m) => m.TagsScenario),
  },
  {
    path: 'reorder',
    loadComponent: () =>
      import('./scenarios/reorder-scenario/reorder-scenario').then((m) => m.ReorderScenario),
  },
  {
    path: 'custom-compare',
    loadComponent: () =>
      import('./scenarios/custom-compare-scenario/custom-compare-scenario').then(
        (m) => m.CustomCompareScenario,
      ),
  },
];
