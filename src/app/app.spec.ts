import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('American Corner website', () => {
  it('renders the main English navigation', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('nav').textContent).toContain('Become a member');
  });
  it('opens and closes mobile navigation', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const toggle = fixture.nativeElement.querySelector('button');
    toggle.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#mobile-nav')).toBeTruthy();
    toggle.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#mobile-nav')).toBeNull();
  });
});
