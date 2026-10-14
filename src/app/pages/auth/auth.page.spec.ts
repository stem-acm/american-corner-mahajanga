import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { AuthPage } from './auth.page';

describe('AuthPage', () => {
  let http: HttpTestingController;
  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      imports: [AuthPage],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    http.verify();
    sessionStorage.clear();
  });
  it('opens the dashboard after successful username/password authentication', () => {
    const fixture = TestBed.createComponent(AuthPage);
    const page = fixture.componentInstance;
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    page.username = 'staff';
    page.password = 'password';
    page.login();
    expect(page.busy()).toBe(true);
    http
      .expectOne('/api/auth/login')
      .flush({ success: true, data: { token: 'token', user: { username: 'staff' } } });
    expect(navigate).toHaveBeenCalledWith('/dashboard');
    expect(page.password).toBe('');
    expect(page.busy()).toBe(false);
  });
  it('shows a login error without opening the dashboard', () => {
    const fixture = TestBed.createComponent(AuthPage);
    const page = fixture.componentInstance;
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl');
    page.username = 'staff';
    page.password = 'wrong';
    page.login();
    http.expectOne('/api/auth/login').flush({}, { status: 401, statusText: 'Unauthorized' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain(
      'Incorrect username or password',
    );
    expect(navigate).not.toHaveBeenCalled();
    expect(page.busy()).toBe(false);
    expect(page.password).toBe('');
  });
  it('does not submit blank credentials or duplicate requests', () => {
    const page = TestBed.createComponent(AuthPage).componentInstance;
    page.login();
    http.expectNone('/api/auth/login');
    page.username = 'staff';
    page.password = 'password';
    page.login();
    page.login();
    http.expectOne('/api/auth/login').flush({ success: false, data: null });
    expect(page.error()).not.toBe('');
  });
});
