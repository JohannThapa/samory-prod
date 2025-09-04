import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, concatMap, map, of, Subject, switchMap, tap, timer } from 'rxjs';
import {
  NotificationDisplayItem,
  NotificationGroup,
  NotificationItem,
} from '../../../../../core/models/notification.model';
import { NotificationService } from '../../../../../core/services/notification.service';
import { ThemeService } from '../../../../../core/services/theme.service';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.css'],
  imports: [ClickOutsideDirective, NgClass, CommonModule, AngularSvgIconModule, NgIf, NgFor],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class NotificationMenuComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  public isOpen = false;
  public unseenCount = signal<number>(0);
  public groupedNotifications = signal<NotificationGroup[]>([]);
  public isLoading = signal(false);
  private refresh$ = new Subject<void>();

  constructor(
    public themeService: ThemeService,
    private toastr: ToastrService,
    private readonly router: Router,
    private readonly auth: AuthService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.startPolling();
  }

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.refresh$.next();
    }
  }

  private startPolling(): void {
    timer(0, 60000)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.notificationService.getNotifications()),
        tap((response) => this.unseenCount.set(response.data.unseenCount)),
        map((response) => this.processNotifications(response.data.notifications)),
        catchError((err) => {
          console.error('Failed to fetch notifications:', err);
          this.toastr.error('Failed to load notifications.');
          return of([]);
        }),
      )
      .subscribe((grouped) => this.groupedNotifications.set(grouped));
  }

  private processNotifications(items: NotificationItem[]): NotificationGroup[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const grouped: Record<string, NotificationDisplayItem[]> = {};

    items.forEach((item) => {
      const notificationDate = new Date(item.timestamp);
      let groupLabel: string;
      let isToday = false;
      let isYesterday = false;

      if (notificationDate.toDateString() === today.toDateString()) {
        groupLabel = 'Today';
        isToday = true;
      } else if (notificationDate.toDateString() === yesterday.toDateString()) {
        groupLabel = 'Yesterday';
        isYesterday = true;
      } else {
        groupLabel = notificationDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      }

      const displayItem: NotificationDisplayItem = {
        ...item,
        displayTime: this.getTimeDifference(item.timestamp),
        icon: this.getIconForType(item.type),
        iconBgClass: this.getIconBgClassForType(item.type),
        isToday,
        isYesterday,
      };

      if (!grouped[groupLabel]) {
        grouped[groupLabel] = [];
      }
      grouped[groupLabel].push(displayItem);
    });

    return Object.keys(grouped).map((key) => ({
      label: key,
      items: grouped[key],
    }));
  }

  private getTimeDifference(timestamp: string): string {
    const now = new Date();
    const then = new Date(timestamp);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';

    return 'Just now';
  }

  private getIconForType(type: string): string {
    switch (type) {
      case 'Rapport validé':
        return 'assets/icons/heroicons/solid/check-circle.svg';
      case 'Diagnostic':
        return 'assets/icons/heroicons/outline/chat-bubble-bottom-center-text.svg';
      default:
        return 'assets/icons/heroicons/solid/bell.svg';
    }
  }

  private getIconBgClassForType(type: string): string {
    switch (type) {
      case 'Rapport validé':
        return 'bg-green-100 text-green-700';
      case 'Diagnostic':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  public markAsSeen(notificationId: number): void {
    this.notificationService
      .markNotificationAsSeen(notificationId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          this.toastr.error('Failed to mark notification as read.');
          return of(null);
        }),
      )
      .subscribe(() => {
        this.toastr.success('Notification marked as read!');
        this.unseenCount.update((count) => count - 1);
        this.refresh$.next();
      });
  }

  public deleteNotification(notificationId: number): void {
    this.notificationService
      .deleteNotification(notificationId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          this.toastr.error('Failed to delete notification.');
          return of(null);
        }),
      )
      .subscribe(() => {
        this.toastr.success('Notification deleted.');
        this.refresh$.next();
      });
  }
}
