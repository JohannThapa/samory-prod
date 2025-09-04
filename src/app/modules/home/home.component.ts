import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, RouterOutlet, HomeFooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('scrollArea', { static: true }) scrollArea?: ElementRef<HTMLElement>;

  private mainContent: HTMLElement | null = null;
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.mainContent = document.getElementById('home-content');
    this.router.events
      .pipe(
        filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        const el = this.scrollArea?.nativeElement;
        if (el) el.scrollTop = 0;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
