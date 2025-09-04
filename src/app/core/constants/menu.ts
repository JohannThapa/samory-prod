import { HomeMenuItem, MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Dashboard',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/home.svg',
          label: 'menu.dashboard',
          route: '/dashboard',
        },
        {
          icon: 'assets/icons/heroicons/outline/home.svg',
          label: 'menu.users_management',
          route: '/users-management',
          children: [
            { label: 'menu.users_management_table', route: '/users-management/all' },
            { label: 'menu.users_management_create', route: '/users-management/create' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/user-circle.svg',
          label: 'menu.contacts',
          route: '/contacts',
          children: [
            { label: 'menu.contacts_table', route: '/contacts/table' },
            { label: 'menu.contacts_create', route: '/contacts/create' },
          ],
        },
        {
          icon: 'assets/icons/internal/security-lock.svg',
          label: 'menu.security_scope',
          route: '/security',
        },
        {
          icon: 'assets/icons/heroicons/outline/tag.svg',
          label: 'menu.nomenclatures',
          route: '/nomenclatures',
          children: [
            { label: 'menu.nomenclatures_table', route: '/nomenclatures/table' },
            { label: 'menu.nomenclatures_create', route: '/nomenclatures/create' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
          label: 'menu.reports_misuse',
          route: '/report',
        },
        {
          icon: 'assets/icons/heroicons/outline/chat-bubble-bottom-center-text.svg',
          label: 'menu.messages',
          route: '/messages',
        },
        {
          icon: 'assets/icons/internal/newsletter.svg',
          label: 'menu.newsletter',
          route: '/newsletter',
        },
        {
          icon: 'assets/icons/internal/carbon_review.svg',
          label: 'menu.avis_notes',
          route: '/avis',
        },
        {
          icon: 'assets/icons/internal/user-key-outline.svg',
          label: 'menu.admin_info',
          route: '/admin',
        },

        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'menu.preferences',
          route: '/preferences',
        },
        {
          icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
          label: 'menu.errors',
          route: '/errors',
          children: [
            { label: 'menu.errors_404', route: '/errors/404' },
            { label: 'menu.errors_500', route: '/errors/500' },
          ],
        },
      ],
    },
    {
      group: 'Organization',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/home.svg',
          label: 'menu.dashboard',
          route: '/dashboard',
        },
        {
          icon: 'assets/icons/internal/diagnostic.svg',
          label: 'menu.my_diagnostic',
          route: '/diagnostic',
          children: [
            { label: 'menu.my_diagnostic_search', route: '/diagnostic/search' },
            { label: 'menu.my_diagnostic_create', route: '/diagnostic/create' },
          ],
        },
        {
          icon: 'assets/icons/internal/user-5.svg',
          label: 'menu.cyber_helpers',
          route: '/cyber-helpers',
        },
        {
          icon: 'assets/icons/internal/document-search-outline.svg',
          label: 'menu.diagnostic_request',
          route: '/diagnostic-request',
        },
        {
          icon: 'assets/icons/heroicons/outline/chat-bubble-bottom-center-text.svg',
          label: 'menu.messages',
          route: '/messages',
        },
        {
          icon: 'assets/icons/heroicons/outline/building-office.svg',
          label: 'menu.organization_info',
          route: '/org-info',
        },
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'menu.preferences',
          route: '/preferences',
        },
      ],
    },
    {
      group: 'Cyber Helper',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/home.svg',
          label: 'menu.dashboard',
          route: '/dashboard/cyber/index',
        },
        {
          icon: 'assets/icons/internal/document-search-outline.svg',
          label: 'menu.diagnostic_request',
          route: '/dashboard/cyber/diagnostic-requests',
        },
        {
          icon: 'assets/icons/internal/diagnostic.svg',
          label: 'menu.my_diagnostic',
          route: '/dashboard/cyber/my-diagnostic',
          // children: [
          //   { label: 'menu.my_diagnostic_search', route: '/diagnostic/search' },
          //   { label: 'menu.my_diagnostic_create', route: '/diagnostic/create' },
          // ],
        },
        {
          icon: 'assets/icons/internal/fluent_organization.svg',
          label: 'menu.organizations',
          route: '/dashboard/cyber/cyber-organization',
          // children: [
          //   { label: 'menu.organizations_table', route: '/dashboard/cyber/cyber-organization' },
          //   { label: 'menu.organizations_create', route: '/dashboard/cyber/cyber-organization/create' },
          // ],
        },

        {
          icon: 'assets/icons/heroicons/outline/chat-bubble-bottom-center-text.svg',
          label: 'menu.messages',
          route: '/dashboard/cyber/messages',
        },
        {
          icon: 'assets/icons/heroicons/outline/user.svg',
          label: 'menu.my_info',
          route: '/my-info',
        },
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'menu.preferences',
          route: '/preferences',
        },
      ],
    },

    {
      group: 'Security Scopes',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'menu.settings',
          route: '/settings',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'menu.notifications',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/folder.svg',
          label: 'menu.folders',
          route: '/folders',
          children: [
            { label: 'menu.folders_current_files', route: '/folders/current-files' },
            { label: 'menu.folders_downloads', route: '/folders/download' },
            { label: 'menu.folders_trash', route: '/folders/trash' },
          ],
        },
      ],
    },
  ];
}

export class HomeMenu {
  public static pages: HomeMenuItem[] = [
    { label: 'NAV_WELCOME', route: '/welcome' },
    {
      label: 'NAV_CYBER_HELPERS',
      children: [
        { label: 'NAV_BECOME_HELPER', route: '/promote-cyber' },
        { label: 'NAV_FIND_HELPER', route: '/cyber-helpers/find' },
      ],
    },
    {
      label: 'NAV_PROMOTE',
      children: [
        { label: 'NAV_PROMOTE_US', route: '/promote/us' },
        { label: 'NAV_PROMOTE_EVENTS', route: '/promote/events' },
      ],
    },
    { label: 'NAV_CONTACT', route: '/contacts' },
  ];
}
