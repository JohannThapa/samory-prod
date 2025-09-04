import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChildren,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  Input,
  QueryList,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { auditTime, filter, fromEvent, interval, map, merge, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { UiSliderDirective } from 'src/app/core/directives/ui-slider.directive';

type Orientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ui-slider',
  imports: [CommonModule],
  template: ` <section
    class="relative select-none"
    [attr.aria-roledescription]="'carousel'"
    [attr.aria-label]="ariaLabel"
    tabindex="0"
    (mouseenter)="onMouseEnter()"
    (mouseleave)="onMouseLeave()">
    <div #viewport class="h-full w-full overflow-hidden" [class]="isHorizontal ? 'touch-pan-y' : 'touch-pan-x'">
      <div
        #track
        class="flex will-change-transform"
        [class.flex-row]="isHorizontal"
        [class.flex-col]="!isHorizontal"
        [ngStyle]="trackStyle"
        (pointerdown)="onPointerDown($event)"
        (pointermove)="onPointerMove($event)"
        (pointerup)="onPointerUp($event)"
        (pointercancel)="onPointerUp($event)"
        (pointerleave)="onPointerUp($event)">
        @for (i of renderIndices; track i) {
        <div
          class="h-full shrink-0 grow-0 basis-full"
          role="group"
          [attr.aria-roledescription]="'slide'"
          [attr.aria-label]="
            'Slide ' + (i === -1 ? slideCount() : i === slideCount() ? 1 : i + 1) + ' of ' + slideCount()
          "
          [@slideContent]="'enter'">
          <ng-container *ngTemplateOutlet="templateForIndex(i); context: { $implicit: i }"></ng-container>
        </div>
        }
      </div>
    </div>

    @if (showArrows) {
    <button
      type="button"
      class="absolute inset-y-0 left-0 my-auto grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/60"
      (click)="prev()"
      aria-label="Previous slide">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    } @if (showArrows) {
    <button
      type="button"
      class="absolute inset-y-0 right-0 my-auto grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/60"
      (click)="next()"
      aria-label="Next slide">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
    } @if (showDots && slideCount() > 1) {
    <div
      class="absolute left-1/2 bottom-3 flex -translate-x-1/2 gap-2 rounded-full bg-black/30 px-2 py-1 text-white backdrop-blur">
      @for (_ of [].constructor(slideCount()); track $index) {
      <button
        type="button"
        class="h-2 w-2 rounded-full transition-all"
        [class.w-5]="activeIndex() === $index"
        [class.bg-white]="activeIndex() === $index"
        [class.bg-gray-60]="activeIndex() !== $index"
        (click)="goTo($index)"></button>
      }
    </div>
    }
  </section>`,
  styles: [
    `
      :host {
        display: block;
      }

      :host * {
        touch-action: pan-y pan-x;
      }

      :host img {
        user-select: none;
        -webkit-user-drag: none;
        pointer-events: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideContent', [
      state('enter', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition('void => enter', [animate('180ms ease-in')]),
      transition('enter => void', [animate('120ms ease-out')]),
    ]),
  ],
})
export class UiSliderComponent implements AfterContentInit {
  @Input() orientation: Orientation = 'horizontal';
  @Input() loop = true;
  @Input() autoplay = true;
  @Input() autoplayIntervalMs = 3500;
  @Input() transitionMs = 450;
  @Input() snapThresholdPx = 60;
  @Input() showArrows = true;
  @Input() showDots = true;
  @Input() pauseOnHover = true;
  @Input() keyboard = true;
  @Input() ariaLabel = 'Carousel';
  @ContentChildren(UiSliderDirective)
  private readonly slideTpls!: QueryList<UiSliderDirective>;

  @ViewChild('viewport', { static: true }) private readonly viewportRef!: ElementRef<HTMLElement>;
  @ViewChild('track', { static: true }) private readonly trackRef!: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);

  readonly activeIndex = signal(0);
  readonly isDragging = signal(false);
  readonly dragStartPos = signal(0);
  readonly dragDelta = signal(0);
  readonly trackTransition = signal(true);

  readonly slideCount: Signal<number> = computed(() => this.slideTpls?.length ?? 0);
  readonly hasClones = computed(() => this.loop && this.slideCount() > 1);

  readonly translatePct = computed(() => {
    const count = this.slideCount();
    const idx = this.activeIndex();
    const baseIndex = this.hasClones() ? idx + 1 : idx;
    const axisDelta = this.orientation === 'horizontal' ? this.dragDelta() : -this.dragDelta();
    const viewportSize = this.viewportSize();
    const dragPct = this.isDragging() && viewportSize > 0 ? (axisDelta / viewportSize) * 100 : 0;
    return -(baseIndex * 100) + dragPct;
  });

  private viewportSize = signal(0);

  private readonly resume$ = new Subject<void>();
  private readonly pause$ = new Subject<void>();

  constructor() {
    const resizeTarget$ = new Subject<HTMLElement>();
    resizeTarget$
      .pipe(
        switchMap((el) =>
          fromEvent(window, 'resize').pipe(
            startWith(null),
            auditTime(50),
            map(() => el),
          ),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe((el) => {
        const rect = el.getBoundingClientRect();
        this.viewportSize.set(this.orientation === 'horizontal' ? rect.width : rect.height);
      });

    effect(() => {
      const el = this.viewportRef?.nativeElement;
      if (el) {
        resizeTarget$.next(el);
      }
    });

    merge(this.resume$.pipe(startWith(void 0)))
      .pipe(
        switchMap(() =>
          this.autoplay
            ? interval(this.autoplayIntervalMs).pipe(takeUntil(merge(this.pause$, this.destroy$)))
            : new Subject<number>(),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.next());

    fromEvent(document, 'visibilitychange')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (document.hidden) this.pause$.next();
        else this.resume$.next();
      });
  }

  ngAfterContentInit(): void {
    if (this.hasClones()) {
      queueMicrotask(() => {
        this.trackTransition.set(false);
        this.activeIndex.set(0);
        requestAnimationFrame(() => this.trackTransition.set(true));
      });
    }
  }

  next(): void {
    const last = this.slideCount() - 1;
    if (last < 0) return;
    const idx = this.activeIndex();
    if (idx < last) {
      this.activeIndex.set(idx + 1);
    } else if (this.loop) {
      this.activeIndex.set(idx + 1);
      this.deferSnapTo(0);
    }
  }

  prev(): void {
    const last = this.slideCount() - 1;
    if (last < 0) return;
    const idx = this.activeIndex();
    if (idx > 0) {
      this.activeIndex.set(idx - 1);
    } else if (this.loop) {
      this.activeIndex.set(-1);
      this.deferSnapTo(last);
    }
  }

  goTo(i: number): void {
    const last = this.slideCount() - 1;
    if (i < 0 || i > last) return;
    this.activeIndex.set(i);
  }

  onPointerDown(ev: PointerEvent) {
    if (ev.button !== 0) return;
    (ev.target as HTMLElement).setPointerCapture?.(ev.pointerId);
    this.pause$.next();
    this.isDragging.set(true);
    this.dragStartPos.set(this.axisPos(ev));
    this.dragDelta.set(0);
    this.trackTransition.set(false);
  }

  onPointerMove(ev: PointerEvent) {
    if (!this.isDragging()) return;
    const delta = this.axisPos(ev) - this.dragStartPos();
    this.dragDelta.set(delta);
  }

  onPointerUp(ev: PointerEvent) {
    if (!this.isDragging()) return;
    (ev.target as HTMLElement).releasePointerCapture?.(ev.pointerId);
    const delta = this.dragDelta();
    const abs = Math.abs(delta);
    const size = this.viewportSize();
    this.isDragging.set(false);
    this.dragDelta.set(0);
    this.trackTransition.set(true);

    if (abs > Math.max(this.snapThresholdPx, size * 0.15)) {
      if ((delta < 0 && this.orientation === 'horizontal') || (delta > 0 && this.orientation === 'vertical')) {
        this.next();
      } else {
        this.prev();
      }
    }
    if (this.autoplay && !document.hidden) this.resume$.next();
  }

  onMouseEnter() {
    if (this.pauseOnHover) this.pause$.next();
  }
  onMouseLeave() {
    if (this.pauseOnHover && this.autoplay) this.resume$.next();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(ev: KeyboardEvent) {
    if (!this.keyboard) return;
    if (this.orientation === 'horizontal') {
      if (ev.key === 'ArrowRight') {
        ev.preventDefault();
        this.next();
      }
      if (ev.key === 'ArrowLeft') {
        ev.preventDefault();
        this.prev();
      }
    } else {
      if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        this.next();
      }
      if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        this.prev();
      }
    }
  }

  get trackTransform(): string {
    const axis = this.orientation === 'horizontal' ? 'X' : 'Y';
    return `translate${axis}(${this.translatePct()}%)`;
  }

  get trackStyle(): Record<string, string> {
    return {
      transform: this.trackTransform,
      transition: this.trackTransition() ? `transform ${this.transitionMs}ms ease` : 'none',
    };
  }

  get isHorizontal(): boolean {
    return this.orientation === 'horizontal';
  }

  get renderIndices(): number[] {
    const count = this.slideCount();
    if (count === 0) return [];
    if (!this.hasClones()) return Array.from({ length: count }, (_, i) => i);
    const last = count - 1;
    return [-1, ...Array.from({ length: count }, (_, i) => i), count];
  }

  templateForIndex(i: number) {
    if (i === -1) return this.slideTpls.get(this.slideCount() - 1)?.tpl;
    if (i === this.slideCount()) return this.slideTpls.get(0)?.tpl;
    return this.slideTpls.get(i)?.tpl;
  }

  private get destroy$() {
    const d$ = new Subject<void>();
    this.destroyRef.onDestroy(() => d$.next());
    this.destroyRef.onDestroy(() => d$.complete());
    return d$;
  }

  private axisPos(ev: PointerEvent): number {
    return this.orientation === 'horizontal' ? ev.clientX : ev.clientY;
  }

  private deferSnapTo(realIndex: number) {
    const unsub = fromEvent<TransitionEvent>(this.trackRef.nativeElement, 'transitionend')
      .pipe(
        filter((e) => e.propertyName === 'transform'),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        unsub.unsubscribe();
        this.trackTransition.set(false);
        this.activeIndex.set(realIndex);
        requestAnimationFrame(() => this.trackTransition.set(true));
      });
  }
}
