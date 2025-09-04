import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { roleGuard } from 'src/app/core/guards/role.guard';
import { AppRole } from 'src/app/core/enums/roles.enum';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRole.ADMIN, AppRole.SUPER_ADMIN] },
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'org',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRole.ORGANIZATION] },
    loadChildren: () => import('../org-dashboard/org-dashboard.module').then((m) => m.OrgDashboardModule),
  },
  {
    path: 'cyber',
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRole.CYBER_HELPER] },
    component: LayoutComponent,
    loadChildren: () => import('../cyber-dashboard/cyber-dashboard.module').then((m) => m.CyberDashboardModule),
  },
  {
    path: 'cyber/profile-helper',
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRole.CYBER_HELPER] },
    loadComponent: () =>
      import('../cyber-dashboard/components/wizards/wizards.component').then((m) => m.WizardComponent),
  },
  {
    path: 'components',
    component: LayoutComponent,
    canActivate: [authGuard],
    loadChildren: () => import('../uikit/uikit.module').then((m) => m.UikitModule),
  },
  { path: '', redirectTo: 'org', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
