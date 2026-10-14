import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { DashboardPage } from './dashboard.page';
import { Auth } from '../../core/auth/auth';

describe('DashboardPage', () => {
  let http: HttpTestingController;
  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    http.verify();
    sessionStorage.clear();
  });
  it('renders real statistics returned by the API', () => {
    const fixture = TestBed.createComponent(DashboardPage);
    http
      .expectOne('/api/dashboard/')
      .flush({
        success: true,
        data: { members: 24, activities: 6, checkins: [{ id: 1 }, { id: 2 }] },
      });
    fixture.detectChanges();
    const numbers = [...fixture.nativeElement.querySelectorAll('strong')].map((n: any) =>
      n.textContent.trim(),
    );
    expect(numbers).toEqual(['24', '6', '2']);
  });
  it('handles unavailable statistics without displaying fabricated totals', () => {
    const fixture = TestBed.createComponent(DashboardPage);
    http.expectOne('/api/dashboard/').flush({}, { status: 403, statusText: 'Forbidden' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain(
      'permission',
    );
    expect(fixture.nativeElement.querySelectorAll('strong').length).toBe(0);
  });
  it('clears the session and returns to login when signing out', () => {
    const fixture = TestBed.createComponent(DashboardPage);
    http
      .expectOne('/api/dashboard/')
      .flush({ success: true, data: { members: 0, activities: 0, checkins: [] } });
    sessionStorage.setItem('acm.staff.token', 'token');
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    fixture.componentInstance.logout();
    expect(TestBed.inject(Auth).token).toBeNull();
    expect(navigate).toHaveBeenCalledWith('/auth');
  });
});
