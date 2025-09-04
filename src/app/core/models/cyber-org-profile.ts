export interface CyberOrganizationProfile {
  id: number;
  name: string;
  location: string;
  type: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  logoUrl?: string;
}

export interface CyberDiagnosticEntry {
  id: string;
  label: string;
  type: string;
  requestedOn: string;
  completedOn?: string;
  status: 'In Progress' | 'Completed' | 'Not Started';
  progress: number;
}

export interface BadgeStyle {
  classes: string;
}

export interface IDiagnosticApplication {
  id: string;
  label: string;
  organization: {
    name: string;
    sub: string;
    avatar: string;
  };
  type: string;
  requestedOn: string;
  completedOn: string | null;
  justification: string;
  status: 'Pending' | 'Submitted' | 'Accepted';
  progress: string;
}
