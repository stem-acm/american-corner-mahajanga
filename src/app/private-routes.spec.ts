import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { App } from './app';
import { routes } from './app.routes';
import { authInterceptor } from './core/auth/auth-interceptor';

describe('Staff routes', () => {
  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
  });
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
    sessionStorage.clear();
  });
  it('allows direct login access without public navigation or footer', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/auth');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('input[name="username"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input[type="password"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('nav')).toBeNull();
    expect(fixture.nativeElement.querySelector('footer')).toBeNull();
  });
  it('redirects a manually entered dashboard URL to the login page', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/dashboard');
    await fixture.whenStable();
    expect(router.url).toBe('/auth');
    expect(fixture.nativeElement.querySelector('app-dashboard')).toBeNull();
  });
  it('keeps staff links out of the public website', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('nav')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelectorAll('a[href="/auth"],a[href="/dashboard"]').length,
    ).toBe(0);
  });
});
