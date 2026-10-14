import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { Auth, StaffUser } from './auth';
import { authInterceptor } from './auth-interceptor';

export const staff: StaffUser = {
  id: 1,
  username: 'staff',
  email: 'staff@example.com',
  role: 'admin',
  permissions: { 'dashboard.view': true },
};

describe('Auth', () => {
  let auth: Auth;
  let http: HttpTestingController;
  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    });
    vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    auth = TestBed.inject(Auth);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    http.verify();
    sessionStorage.clear();
  });
  it('posts username and password and stores only the returned token', () => {
    auth.login('staff', 'password').subscribe();
    const request = http.expectOne('/api/auth/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ username: 'staff', password: 'password' });
    expect(request.request.headers.has('Authorization')).toBe(false);
    request.flush({ success: true, data: { token: 'server-token', user: staff } });
    expect(auth.token).toBe('server-token');
    expect(auth.user()).toEqual(staff);
    expect(sessionStorage.length).toBe(1);
  });
  it('does not create a session for invalid credentials', () => {
    auth.login('staff', 'wrong').subscribe({ error: () => {} });
    http.expectOne('/api/auth/login').flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(auth.token).toBeNull();
  });
  it('validates a restored session with a bearer token and clears it on logout', () => {
    sessionStorage.setItem('acm.staff.token', 'saved-token');
    auth.verify().subscribe();
    const request = http.expectOne('/api/auth/token');
    expect(request.request.headers.get('Authorization')).toBe('Bearer saved-token');
    request.flush({ success: true, data: staff });
    expect(auth.user()?.username).toBe('staff');
    auth.logout();
    expect(auth.token).toBeNull();
    expect(auth.user()).toBeNull();
  });
  it('clears an expired session on an API 401', () => {
    sessionStorage.setItem('acm.staff.token', 'expired');
    auth.verify().subscribe({ error: () => {} });
    http.expectOne('/api/auth/token').flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(auth.token).toBeNull();
  });
});
