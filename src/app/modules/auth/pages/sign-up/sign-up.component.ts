import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  EnvironmentInjector,
  inject,
  OnDestroy,
  OnInit,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RegisterUserType } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { passwordStrengthValidator, passwordMatchValidator } from 'src/app/core/utils/password';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgSelectModule],
})
export class SignUpComponent implements OnInit, OnDestroy {
  private injector = inject(EnvironmentInjector);
  terms = new FormControl(false, Validators.requiredTrue);

  form = this.fb.group(
    {
      userType: ['', Validators.required],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.pattern(/^\d{8,15}$/)]],
      address: [''],
      organizationName: [''],
      rootKey: [''],
    },
    { validators: passwordMatchValidator },
  );

  passwordVisible = false;
  submitted = false;

  selectedType = signal<RegisterUserType>('root');
  loading = signal(false);
  errorMsg = signal<string | null>(null);
  isRegistered = signal(false);

  isRoot = computed(() => this.selectedType() === 'root');
  isAdmin = computed(() => this.selectedType() === 'admin');
  isSuper = computed(() => this.selectedType() === 'super-admin');
  isOrg = computed(() => this.selectedType() === 'organization');
  isCyber = computed(() => this.selectedType() === 'cyber-helper');

  passwordControl = this.form.get('password') as FormControl;
  hasMinLength = signal(false);
  hasUpperCase = signal(false);
  hasNumber = signal(false);
  hasSpecialChar = signal(false);
  isPasswordStrong = computed(
    () => this.hasMinLength() && this.hasUpperCase() && this.hasNumber() && this.hasSpecialChar(),
  );

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const url = this.router.url;
    if (url.includes('register-organization')) {
      this.setUserType('organization');
    } else if (url.includes('register-helper')) {
      this.setUserType('cyber-helper');
    } else if (url.includes('register-sadmin')) {
      this.setUserType('super-admin');
    } else if (url.includes('register-admin')) {
      this.setUserType('admin');
    } else {
      this.setUserType('admin');
    }

    this.subscriptions.push(
      this.form.controls.userType.valueChanges.subscribe((type) => {
        if (type && type !== this.selectedType()) {
          this.selectedType.set(type as RegisterUserType);
        }
      }),
    );
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const t = this.selectedType();
        const { organizationName, rootKey } = this.form.controls;

        rootKey.clearValidators();
        organizationName.clearValidators();

        if (t === 'root') {
          rootKey.addValidators([Validators.required, Validators.minLength(3)]);
          organizationName.addValidators([Validators.required, Validators.minLength(2)]);
        } else if (t === 'organization') {
          organizationName.addValidators([Validators.required, Validators.minLength(2)]);
        }

        rootKey.updateValueAndValidity({ emitEvent: false });
        organizationName.updateValueAndValidity({ emitEvent: false });
      });
    });

    this.subscriptions.push(
      this.form.controls.password.valueChanges.subscribe((value: any) => {
        this.hasMinLength.set((value?.length ?? 0) >= 8);
        this.hasUpperCase.set(/[A-Z]/.test(value));
        this.hasNumber.set(/[0-9]/.test(value));
        this.hasSpecialChar.set(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value));
        this.form.controls.confirmPassword.updateValueAndValidity();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  get f() {
    return this.form.controls;
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  private setUserType(type: RegisterUserType) {
    this.selectedType.set(type);
    this.form.controls.userType.setValue(type, { emitEvent: false });
  }

  submit() {
    this.submitted = true;
    this.errorMsg.set(null); // Clear previous errors

    if (this.form.invalid || this.terms.invalid || this.loading()) return;

    this.loading.set(true);

    const val = this.form.getRawValue();
    const type = val.userType as RegisterUserType;

    let payload: any = {
      email: val.email,
      password: val.password,
      phone: val.phone || undefined,
      address: val.address || undefined,
      fullName: val.fullName,
    };

    if (type === 'root') {
      payload.organizationName = val.organizationName ?? '';
      payload.rootKey = val.rootKey!;
    } else if (type === 'organization' || 'super-admin' || 'admin') {
      payload.organizationName = val.organizationName!;
    } else if (type === 'cyber-helper') {
      payload.organizationName = val.organizationName ?? '';
    }

    this.auth.register(payload, type).subscribe({
      next: () => {
        this.loading.set(false);
        this.isRegistered.set(true);
      },
      error: (err) => {
        this.loading.set(false);
        if (err.error && typeof err.error === 'object') {
          const apiErrors = err.error;
          for (const key in apiErrors) {
            if (this.form.controls[key as keyof typeof this.form.controls]) {
              this.form.controls[key as keyof typeof this.form.controls].setErrors({ apiError: apiErrors[key] });
            }
          }
        } else {
          this.errorMsg.set(err.message ?? 'Registration failed.');
        }
      },
    });
  }
}
