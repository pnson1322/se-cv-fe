import { api } from "@/lib/axios";
import {
  MarkReadBody,
  MarkReadResponse,
  NotificationItem,
  PaginationResponse,
  ResponseSuccess,
  UnreadResponse,
} from "../types/notification.types";

type GetNotificationsParams = {
  page?: number;
  limit?: number;
};

export async function getNotifications(params: GetNotificationsParams = {}) {
  const { page = 1, limit = 10 } = params;

  const res = await api.get<
    ResponseSuccess<PaginationResponse<NotificationItem>>
  >("/notifications", {
    params: { page, limit },
  });

  return res.data;
}

export async function deleteNotifications() {
  const res = await api.delete("/notifications");
  return res.data;
}

export async function getUnreadCount() {
  const res = await api.get<UnreadResponse>("/notifications/unread-count");
  return res.data;
}

export async function markRead(payload: MarkReadBody) {
  const res = await api.patch<MarkReadResponse>(
    "/notifications/mark-read",
    payload,
  );
  return res.data;
}

export async function deleteNotificationById(id: number) {
  const res = await api.delete(`/notifications/${id}`);
  return res.data;
}
