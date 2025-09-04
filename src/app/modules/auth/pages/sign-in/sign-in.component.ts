import { Component, OnInit, signal, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { LoginPayload } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/core/services/token.service';
import { UserType } from 'src/app/core/enums/user.enum';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, CommonModule],
})
export class SignInComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  submitted = false;
  passwordVisible = false;
  loading = signal(false);
  errorMsg = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  private returnUrl = '/dashboard';

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly route: ActivatedRoute,
    private readonly tokenService: TokenService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    const q = this.route.snapshot.queryParamMap;
    this.returnUrl = q.get('returnUrl') || '/dashboard';
  }

  get f() {
    return this.form.controls;
  }

  get userType() {
    const user = this.tokenService.userFromToken();
    if (user) return user?.type;
    return null;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  private computeDefaultDashboard(): string {
    const user = this.tokenService.userFromToken();
    const t = user?.type;
    if (t === UserType.ORGANIZATION) return '/dashboard/org/index';
    if (t === UserType.CYBER_HELPER) return '/dashboard/cyber/index';

    return '/dashboard';
  }
  onSubmit() {
    this.submitted = true;
    this.errorMsg.set(null);
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);

    const val = this.form.getRawValue();
    const payload: LoginPayload = {
      email: val.email || '',
      password: val.password || '',
    };

    this.auth
      .login(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading.set(false);
          if (this.returnUrl && this.returnUrl !== '/dashboard') {
            this.router.navigateByUrl(this.returnUrl);
            return;
          }

          const target = this.computeDefaultDashboard();
          this.router.navigateByUrl(target);
          if (this.userType) {
            console.log(this.userType);
            const user = this.userType === UserType.ORGANIZATION ? 'Organization User' : 'Cyber-helper User';

            this.toastr.success('Login Successful!', user);
          } else {
            this.toastr.success('Login Successful!', '');
          }
        },
        error: (err: Error) => {
          this.loading.set(false);
          this.errorMsg.set(err.message ?? 'Login failed. Please check your credentials.');
          this.toastr.error('Failed', 'Login Failed!');
        },
      });
  }
}
