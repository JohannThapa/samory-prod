export interface NotificationItem {
  id: number;
  username: string;
  title: string;
  message: string;
  type: string;
  seen: boolean;
  timestamp: string;
}

export interface NotificationsResponse {
  code: number;
  message: string;
  data: {
    notifications: NotificationItem[];
    unseenCount: number;
  };
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface ApiResponse {
  code: number;
  message: string;
}

export interface NotificationDisplayItem {
  id: number;
  title: string;
  message: string;
  type: string;
  seen: boolean;
  timestamp: string;
  displayTime: string;
  icon: string;
  iconBgClass: string;
  isToday: boolean;
  isYesterday: boolean;
}

export interface NotificationGroup {
  label: string;
  items: NotificationDisplayItem[];
}

export interface UnseenCountResponse {
  unseenCount: number;
}
