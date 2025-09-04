import {
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HomeMenuService } from '../../services/home-menu.service';
import { NgClass, NgIf } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';
import { filter, Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';

type ScrollTarget = Window | HTMLElement;

@Component({
  selector: 'app-home-navbar',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    NavbarMenuComponent,
    NavbarMobileComponent,
    RouterLink,
    NgClass,
    LanguageSwitchComponent,
    TranslateModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy, OnChanges {
  @Input() scrollTarget?: HTMLElement | null;

  public isHomePage = false;
  public scrolled = false;

  private destroy$ = new Subject<void>();
  private scrollHandler?: () => void;
  private boundTarget: ScrollTarget | null = null;
  private rafPending = false;
  private readonly SCROLL_THRESHOLD = 50;

  constructor(
    public menuService: HomeMenuService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.syncIsHomeFromUrl(this.router.url);

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe((e) => {
        this.syncIsHomeFromUrl(e.urlAfterRedirects);
        this.computeScrolled(this.getCurrentScrollTop());
      });

    this.bindScrollTarget(this.scrollTarget ?? window);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('scrollTarget' in changes && changes['scrollTarget'].currentValue !== changes['scrollTarget'].previousValue) {
      this.bindScrollTarget(this.scrollTarget ?? window);
    }
  }

  ngOnDestroy(): void {
    this.unbindScrollTarget();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private syncIsHomeFromUrl(url: string): void {
    this.isHomePage =
      url === '/' ||
      url === '/home' ||
      url === '/contacts' ||
      url === '/stats-utils' ||
      url === '/help' ||
      url === '/promote-cyber';
  }

  private getCurrentScrollTop(): number {
    if (this.boundTarget && this.boundTarget !== window) {
      return (this.boundTarget as HTMLElement).scrollTop;
    }
    return window.pageYOffset || document.documentElement.scrollTop || 0;
  }

  private bindScrollTarget(target: ScrollTarget): void {
    this.unbindScrollTarget();

    this.boundTarget = target;

    this.ngZone.runOutsideAngular(() => {
      this.scrollHandler = () => {
        if (this.rafPending) return;
        this.rafPending = true;
        requestAnimationFrame(() => {
          const y = this.getCurrentScrollTop();
          const next = y > this.SCROLL_THRESHOLD;
          if (next !== this.scrolled) {
            this.ngZone.run(() => {
              this.scrolled = next;
              this.cdr.markForCheck();
            });
          }
          this.rafPending = false;
        });
      };

      const opts: AddEventListenerOptions = { passive: true };
      if (target === window) {
        window.addEventListener('scroll', this.scrollHandler!, opts);
      } else {
        (target as HTMLElement).addEventListener('scroll', this.scrollHandler!, opts);
      }
    });

    this.computeScrolled(this.getCurrentScrollTop());
  }

  private unbindScrollTarget(): void {
    if (!this.boundTarget || !this.scrollHandler) return;
    if (this.boundTarget === window) {
      window.removeEventListener('scroll', this.scrollHandler);
    } else {
      (this.boundTarget as HTMLElement).removeEventListener('scroll', this.scrollHandler);
    }
    this.boundTarget = null;
    this.scrollHandler = undefined;
  }

  private computeScrolled(y: number): void {
    const next = y > this.SCROLL_THRESHOLD;
    if (next !== this.scrolled) {
      this.scrolled = next;
      this.cdr.markForCheck();
    }
  }

  get strokeColor(): string {
    return this.isHomePage && !this.scrolled ? 'rgba(255, 255, 255, 0.30)' : 'rgba(35, 4, 72, 0.30)';
  }

  login() {}
}
