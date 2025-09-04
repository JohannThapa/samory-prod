import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgDashboardComponent } from './org-dashboard.component';
import { OrgComponent } from './pages/org/org.component';
import { OrgOverviewComponent } from './pages/org-overview/org-overview.component';
import { CyberHelperOrgComponent } from './pages/cyber-helper-org/cyber-helper-org.component';

const routes: Routes = [
  {
    path: '',
    component: OrgDashboardComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: OrgOverviewComponent },
      { path: 'cyber-helper', component: CyberHelperOrgComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgDashboardRoutingModule {}
