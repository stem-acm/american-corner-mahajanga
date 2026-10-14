import { Component, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ApiResponse, Auth } from '../../core/auth/auth';
interface DashboardStats {
  members: number;
  activities: number;
  checkins: { id: number }[];
}

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css',
})
export class DashboardPage {
  readonly auth = inject(Auth);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  readonly stats = signal<DashboardStats | null>(null);
  readonly busy = signal(false);
  readonly error = signal('');
  constructor() {
    this.load();
  }
  load() {
    if (this.busy()) return;
    this.busy.set(true);
    this.error.set('');
    this.http
      .get<ApiResponse<DashboardStats>>('/api/dashboard/')
      .pipe(finalize(() => this.busy.set(false)))
      .subscribe({
        next: (response) => {
          if (response.success) this.stats.set(response.data);
          else this.error.set('Unable to load dashboard statistics. Please try again.');
        },
        error: (error: HttpErrorResponse) =>
          this.error.set(
            error.status === 403
              ? 'Your account does not have permission to view dashboard statistics.'
              : 'Unable to load dashboard statistics. Please try again.',
          ),
      });
  }
  logout() {
    this.auth.logout();
    void this.router.navigateByUrl('/auth');
  }
}
