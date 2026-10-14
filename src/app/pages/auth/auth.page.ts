import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Auth } from '../../core/auth/auth';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.css',
})
export class AuthPage {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  username = '';
  password = '';
  readonly busy = signal(false);
  readonly error = signal('');

  login() {
    if (this.busy() || !this.username.trim() || !this.password) return;
    this.busy.set(true);
    this.error.set('');
    this.auth
      .login(this.username.trim(), this.password)
      .pipe(finalize(() => this.busy.set(false)))
      .subscribe({
        next: () => {
          this.password = '';
          void this.router.navigateByUrl('/dashboard');
        },
        error: (error: HttpErrorResponse) => {
          this.password = '';
          this.error.set(
            error.status === 401 || error.status === 404
              ? 'Incorrect username or password.'
              : error.status === 429
                ? 'Too many login attempts. Please try again later.'
                : error.status === 403
                  ? 'This account is inactive. Contact your administrator.'
                  : 'Unable to sign in. Please check your connection and try again.',
          );
        },
      });
  }
}
