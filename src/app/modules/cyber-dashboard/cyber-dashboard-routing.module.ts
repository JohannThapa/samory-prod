import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CyberDashboardComponent } from './cyber-dashboard.component';
import { CyberComponent } from './pages/cyber/cyber.component';
import { DiagnosticRequestsComponent } from './pages/diagnostic-requests/diagnostic-requests.component';
import { CyberOrganizationComponent } from './pages/cyber-organization/cyber-organization.component';
import { CyberOrgProfileComponent } from './pages/cyber-org-profile/cyber-org-profile.component';
import { MyDiagnosticComponent } from './pages/my-diagnostic/my-diagnostic.component';
import { CyberMessageComponent } from './pages/cyber-message/cyber-message.component';

const routes: Routes = [
  {
    path: '',
    component: CyberDashboardComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: CyberComponent },
      { path: 'diagnostic-requests', component: DiagnosticRequestsComponent },
      { path: 'cyber-organization', component: CyberOrganizationComponent },
      { path: 'cyber-organization/:id', component: CyberOrgProfileComponent },
      { path: 'my-diagnostic', component: MyDiagnosticComponent },
      { path: 'messages', component: CyberMessageComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CyberDashboardRoutingModule {}
