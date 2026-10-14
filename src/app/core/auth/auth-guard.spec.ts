import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { firstValueFrom, isObservable } from 'rxjs';
import { authGuard } from './auth-guard';

function runGuard() {
  return TestBed.runInInjectionContext(() =>
    authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
  );
}
describe('authGuard', () => {
  let http: HttpTestingController;
  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    });
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    http.verify();
    sessionStorage.clear();
  });
  it('redirects direct unauthenticated dashboard visits to /auth', () => {
    const result = runGuard() as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/auth');
    http.expectNone('/api/auth/token');
  });
  it('requires server verification even when a token is stored', async () => {
    sessionStorage.setItem('acm.staff.token', 'saved');
    const result = runGuard();
    if (!isObservable(result)) throw new Error('Expected token verification');
    const outcome = firstValueFrom(result);
    http.expectOne('/api/auth/token').flush({ success: true, data: { username: 'staff' } });
    expect(await outcome).toBe(true);
  });
  it('rejects forged or expired tokens', async () => {
    sessionStorage.setItem('acm.staff.token', 'forged');
    const result = runGuard();
    if (!isObservable(result)) throw new Error('Expected token verification');
    const outcome = firstValueFrom(result);
    http.expectOne('/api/auth/token').flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(TestBed.inject(Router).serializeUrl((await outcome) as UrlTree)).toBe('/auth');
    expect(sessionStorage.getItem('acm.staff.token')).toBeNull();
  });
});
