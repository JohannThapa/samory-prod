import { FeatureList } from 'src/app/core/models/layout.model';

export const Security = [
  {
    iconSrc: 'assets/icons/internal/lock.svg',
    title: 'Security Governance Framework',
    description: 'Defined roles, responsibilities, and access levels for admins, cyber helpers, and organizations.',
  },
  {
    iconSrc: 'assets/icons/internal/cloud-lock.svg',
    title: 'Data Access Control',
    description: 'Role-based access ensures users only see and manage information that is relevant to their role.',
  },
  {
    iconSrc: 'assets/icons/internal/scan.svg',
    title: 'Audit Logs',
    description: 'All actions are logged and monitored to maintain traceability and accountability.',
  },
  {
    iconSrc: 'assets/icons/internal/checklist.svg',
    title: 'Compliance',
    description: 'Aligned with data protection laws and security standards to protect user information.',
  },
];

export const ProtectionLeft: FeatureList = {
  title: 'SSL/TLS Encryption',
  items: [
    'All data exchanged between users and our platform is encrypted using HTTPS.',
    'Ensures secure and private communication.',
  ],
  iconSrc: 'assets/icons/lock.svg',
};

export const ProtectionRight: FeatureList = {
  title: 'Secure Authentication',
  items: [
    'Passwords are hashed and stored with modern encryption methods.',
    'Prevents unauthorized access to user accounts.',
  ],
  iconSrc: 'assets/icons/lock.svg',
};

export const ProtectionBottomLeft: FeatureList = {
  title: 'Data Backups',
  items: [
    'Encrypted backups performed on a regular schedule.',
    'Ensures data is never lost and can be quickly restored.',
  ],
};
export const ProtectionBottomRight: FeatureList = {
  title: 'Regular Security Testing',
  items: ['Frequent vulnerability scans and third-party audits.', 'Detect and fix weaknesses proactively.'],
};

export const DefenseL1: FeatureList = {
  title: 'Intrusion Detection',
  items: ['Automated monitoring systems detect suspicious activity in real time.'],
};
export const DefenseR1: FeatureList = {
  title: 'Incident Response Plan',
  items: ['Structured process for isolation, investigation, remediation, and reporting.'],
};
export const DefenseL2: FeatureList = {
  title: 'User Notification',
  items: ['Affected users notified within 48 hours with guidance and recommended actions.'],
};
export const DefenseR2: FeatureList = {
  title: 'Continuous Improvement',
  items: ['All incidents are logged, analyzed, and used to strengthen defenses and resilience.'],
};
export const DefenseL3: FeatureList = {
  title: 'Crisis Management & Coordination',
  items: ['Internal workflows and expert teams ready to act quickly during crises.'],
};
export const DefenseR3: FeatureList = {
  title: 'Resilience',
  items: ['Architecture and operations designed for reliability and quick recovery.'],
};

export const AccessCards = [
  {
    iconSrc: 'assets/icons/internal/assistance.svg',
    title: 'Cyber Helpers',
    description: 'Can only view diagnostic requests they are assigned to. No access to unrelated data.',
  },
  {
    iconSrc: 'assets/icons/internal/hub.svg',
    title: 'Organizations',
    description: 'Can access their own diagnostic requests, reports, feedback, and organization profile.',
  },
  {
    iconSrc: 'assets/icons/internal/bell-cog.svg',
    title: 'Administrators',
    description: 'Structured access based on responsibilities and role (Admin, Operator, Super Admin).',
  },
];
