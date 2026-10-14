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
  { path: '**', redirectTo: '' },
];
