import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DiagnosticsFilterValue } from 'src/app/core/models/cyber-dashboard.model';

@Component({
  selector: 'app-diagnostic-filter',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="w-[280px]">
      <div class="rounded-xl border border-[#2304481A] bg-white p-5 shadow-sm">
        <div class="mb-8 flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.7096 9.99999H7.4138M3.77964 9.99999H2.29297M3.77964 9.99999C3.77964 9.51818 3.97103 9.0561 4.31172 8.71541C4.65242 8.37472 5.11449 8.18332 5.5963 8.18332C6.07811 8.18332 6.54019 8.37472 6.88088 8.71541C7.22157 9.0561 7.41297 9.51818 7.41297 9.99999C7.41297 10.4818 7.22157 10.9439 6.88088 11.2846C6.54019 11.6253 6.07811 11.8167 5.5963 11.8167C5.11449 11.8167 4.65242 11.6253 4.31172 11.2846C3.97103 10.9439 3.77964 10.4818 3.77964 9.99999ZM17.7096 15.5058H12.9196M12.9196 15.5058C12.9196 15.9877 12.7278 16.4503 12.387 16.7911C12.0462 17.1319 11.5841 17.3233 11.1021 17.3233C10.6203 17.3233 10.1582 17.1311 9.81756 16.7904C9.47687 16.4497 9.28547 15.9876 9.28547 15.5058M12.9196 15.5058C12.9196 15.0239 12.7278 14.5621 12.387 14.2214C12.0462 13.8806 11.5841 13.6892 11.1021 13.6892C10.6203 13.6892 10.1582 13.8806 9.81756 14.2212C9.47687 14.5619 9.28547 15.024 9.28547 15.5058M9.28547 15.5058H2.29297M17.7096 4.49416H15.1221M11.488 4.49416H2.29297M11.488 4.49416C11.488 4.01235 11.6794 3.55027 12.0201 3.20958C12.3607 2.86889 12.8228 2.67749 13.3046 2.67749C13.5432 2.67749 13.7794 2.72448 13.9998 2.81578C14.2203 2.90707 14.4205 3.04089 14.5892 3.20958C14.7579 3.37827 14.8917 3.57854 14.983 3.79895C15.0743 4.01936 15.1213 4.25559 15.1213 4.49416C15.1213 4.73272 15.0743 4.96896 14.983 5.18937C14.8917 5.40977 14.7579 5.61004 14.5892 5.77873C14.4205 5.94743 14.2203 6.08124 13.9998 6.17254C13.7794 6.26383 13.5432 6.31082 13.3046 6.31082C12.8228 6.31082 12.3607 6.11943 12.0201 5.77873C11.6794 5.43804 11.488 4.97597 11.488 4.49416Z"
              stroke="#230448"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round" />
          </svg>
          <h4 class="text-sm font-semibold text-[#2A1F4D]">Filters</h4>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
          <div class="border-b border-[#2304481A] pb-4">
            <div class="relative">
              <input
                formControlName="search"
                type="search"
                placeholder="Search diagnostics requests..."
                class="w-full rounded-lg border border-violet-100 bg-[#FBF8FD] px-4 py-2 text-sm placeholder:text-[#CDBDE6] focus:outline-none focus:ring-2 focus:ring-violet-100" />
              <button type="button" class="absolute right-2 top-1.5 text-[#8E6DBA]" (click)="clearSearch()">×</button>
            </div>
          </div>

          <div>
            <label class="text-primary mb-4 block text-sm font-medium">City / Region</label>
            <ng-select
              [items]="cityOptions"
              bindLabel="name"
              formControlName="citySingle"
              placeholder="Select"
              class="ng-select-custom text-xs"></ng-select>
          </div>

          <div class="border-t border-[#2304481A] pt-2 md:pt-6">
            <label class="text-primary mb-4 block text-sm font-medium">Organization Type</label>
            <div class="text-primary space-y-5 text-sm font-medium">
              <label class="flex items-center gap-3  text-sm">
                <input type="checkbox" (change)="toggleArray('types', 'NGO')" [checked]="isChecked('types', 'NGO')" />
                NGO
              </label>
              <label class="flex items-center gap-3 text-sm">
                <input type="checkbox" (change)="toggleArray('types', 'SME')" [checked]="isChecked('types', 'SME')" />
                SME
              </label>
              <label class="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  (change)="toggleArray('types', 'Local Authority')"
                  [checked]="isChecked('types', 'Local Authority')" />
                Local Authority
              </label>
            </div>
          </div>

          <div class="text-primary border-t border-[#2304481A] pt-2 text-sm font-medium md:pt-6">
            <label class=" mb-4 block">Diagnostic Type</label>
            <div class="space-y-5">
              <label class="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  (change)="toggleArray('diagnosticTypes', 'Audit')"
                  [checked]="isChecked('diagnosticTypes', 'Audit')" />
                Audit
              </label>
              <label class="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  (change)="toggleArray('diagnosticTypes', 'Evaluation')"
                  [checked]="isChecked('diagnosticTypes', 'Evaluation')" />
                Evaluation
              </label>
              <label class="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  (change)="toggleArray('diagnosticTypes', 'AwarenessCampaign')"
                  [checked]="isChecked('diagnosticTypes', 'AwarenessCampaign')" />
                Awareness Campaign
              </label>
            </div>
          </div>

          <div class="text-primary border-t border-[#2304481A] pt-2 text-sm font-medium md:pt-6">
            <label class="mb-4 block">Status</label>
            <div class="space-y-5">
              <label class="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  (change)="toggleArray('status', 'Open')"
                  [checked]="isChecked('status', 'Open')" />
                Open
              </label>
              <label class="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  (change)="toggleArray('status', 'In Progress')"
                  [checked]="isChecked('status', 'In Progress')" />
                In Progress
              </label>
              <label class="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  (change)="toggleArray('status', 'Closed')"
                  [checked]="isChecked('status', 'Closed')" />
                Closed
              </label>
            </div>
          </div>

          <div class="pt-4">
            <button
              type="submit"
              class="w-full rounded-lg bg-[#2F195F] py-2 text-sm font-semibold text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-200">
              Apply Filter
            </button>

            <button
              type="button"
              (click)="reset()"
              class="text-primary mt-2 w-full rounded-lg border border-violet-100 bg-white py-2 text-sm">
              Reset
            </button>
          </div>
        </form>
      </div>
    </aside>
  `,
  styleUrl: './diagnostic-filter.component.css',
})
export class DiagnosticFilterComponent implements OnInit {
  @Output() submitFilters = new EventEmitter<DiagnosticsFilterValue>();
  @Output() resetFilters = new EventEmitter<void>();

  form!: FormGroup;

  cityOptions = ['Kindia', 'Conakry', 'Ratoma'];
  ngCityOptions = [{ label: '', value: '' }];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''],
      citySingle: [''],
      typesArr: [[]],
      diagnosticTypesArr: [[]],
      statusArr: [[]],
    });

    this._types = [];
    this._diagnosticTypes = [];
    this._status = [];
  }

  private _types: string[] = [];
  private _diagnosticTypes: string[] = [];
  private _status: string[] = [];

  toggleArray(controlKey: 'types' | 'diagnosticTypes' | 'status', value: string) {
    let arrRef: string[];
    if (controlKey === 'types') arrRef = this._types;
    else if (controlKey === 'diagnosticTypes') arrRef = this._diagnosticTypes;
    else arrRef = this._status;

    const idx = arrRef.indexOf(value);
    if (idx >= 0) arrRef.splice(idx, 1);
    else arrRef.push(value);
  }

  isChecked(controlKey: 'types' | 'diagnosticTypes' | 'status', value: string) {
    if (controlKey === 'types') return this._types.includes(value);
    if (controlKey === 'diagnosticTypes') return this._diagnosticTypes.includes(value);
    return this._status.includes(value);
  }

  submit() {
    const raw = this.form.value;
    const body: DiagnosticsFilterValue = {
      search: raw.search?.trim() || undefined,
      city: raw.citySingle ? [raw.citySingle] : [],
      types: this._types.length ? this._types.slice() : [],
      diagnosticTypes: this._diagnosticTypes.length ? this._diagnosticTypes.slice() : [],
      status: this._status.length ? this._status.slice() : [],
    };

    this.submitFilters.emit(body);
  }

  reset() {
    this.form.reset({ search: '', citySingle: '' });
    this._types = [];
    this._diagnosticTypes = [];
    this._status = [];
    this.resetFilters.emit();
  }

  clearSearch() {
    this.form.patchValue({ search: '' });
  }
}
