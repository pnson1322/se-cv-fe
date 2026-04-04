export type NotificationItem = {
  notification_id: number;
  user_id: number;
  type: string;
  title: string;
  message: string;
  link: string | null;
  is_read: boolean;
  created_at: string;
};

export type PaginationMeta = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

export type PaginationResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type ResponseSuccess<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type UnreadResponse = {
  success: boolean;
  message: string;
  data: {
    unread_count: number;
  };
};

export type MarkReadBody = {
  notificationIds: number[];
};

export type MarkReadResponse = {
  success: boolean;
  message: string;
  data: Record<string, never>;
};
