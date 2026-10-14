import { authGuard } from './core/auth/auth-guard';
import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { MembershipPage } from './pages/membership/membership.page';
import { SchedulePage } from './pages/schedule/schedule.page';
export const routes: Routes = [
  { path: '', component: HomePage, title: 'American Corner Mahajanga | Learn, connect, grow' },
  {
    path: 'membership',
    component: MembershipPage,
    title: 'Become a Member | American Corner Mahajanga',
  },
  {
    path: 'schedule',
    component: SchedulePage,
    title: 'Schedule & Activities | American Corner Mahajanga',
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then((m) => m.AuthPage),
    title: 'Staff Sign In | American Corner Mahajanga',
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
    title: 'Dashboard | American Corner Mahajanga',
  },
  { path: '**', redirectTo: '' },
];
