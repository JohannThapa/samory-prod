export type DiagnosticRow = {
  id: number;
  title: string;
  orgName: string;
  orgAvatar?: string;
  orgType?: string;
  location?: string;
  postedOn: string;
  status: 'Open' | 'In Progress' | 'Closed' | 'Completed' | 'Not Started';
  description: string;
  tags: string[];
  progress?: string;
  website?: string;
};

export type DiagnosticsFilterValue = {
  search?: string;
  city?: string[];
  types?: string[];
  diagnosticTypes?: string[];
  status?: string[];
};

export interface OverviewResponse {
  code: number;
  message: string;
  data: DashboardOverview;
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface DashboardOverview {
  'Submitted Reports': number;
  'Offers Made': number;
  'Rejected Offers': number;
  'Accepted Offers': number;
}
