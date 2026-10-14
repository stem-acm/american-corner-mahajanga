import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

export interface StaffUser {
  id: number;
  username: string;
  email: string;
  role: string;
  permissions: Record<string, boolean>;
}
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly storageKey = 'acm.staff.token';
  readonly user = signal<StaffUser | null>(null);

  get token(): string | null {
    return sessionStorage.getItem(this.storageKey);
  }

  login(username: string, password: string) {
    return this.http
      .post<ApiResponse<{ token: string; user: StaffUser }>>('/api/auth/login', {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          if (!response.success || !response.data?.token) throw new Error('Login failed');
          sessionStorage.setItem(this.storageKey, response.data.token);
          this.user.set(response.data.user);
        }),
      );
  }

  verify() {
    return this.http.get<ApiResponse<StaffUser>>('/api/auth/token').pipe(
      map((response) => {
        if (!response.success || !response.data) throw new Error('Session invalid');
        this.user.set(response.data);
        return response.data;
      }),
    );
  }

  logout() {
    sessionStorage.removeItem(this.storageKey);
    this.user.set(null);
  }
}
