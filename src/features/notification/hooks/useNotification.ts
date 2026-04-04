"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteNotificationById,
  deleteNotifications,
  getNotifications,
  getUnreadCount,
  markRead,
} from "../api/notification.api";
import type {
  MarkReadBody,
  NotificationItem,
  PaginationResponse,
  ResponseSuccess,
} from "../types/notification.types";

const PAGE_SIZE = 10;

type NotificationListResponse = ResponseSuccess<
  PaginationResponse<NotificationItem>
>;

type NotificationInfiniteData = InfiniteData<NotificationListResponse, number>;

export const notificationKeys = {
  all: ["notifications"] as const,
  infinite: () => [...notificationKeys.all, "infinite"] as const,
  unread: () => [...notificationKeys.all, "unread"] as const,
};

function updatePages(
  oldData: NotificationInfiniteData | undefined,
  updater: (items: NotificationItem[]) => NotificationItem[],
): NotificationInfiniteData | undefined {
  if (!oldData) return oldData;

  return {
    ...oldData,
    pages: oldData.pages.map((page) => ({
      ...page,
      data: {
        ...page.data,
        data: updater(page.data.data),
      },
    })),
  };
}

function findNotification(
  oldData: NotificationInfiniteData | undefined,
  id: number,
) {
  if (!oldData) return null;

  for (const page of oldData.pages) {
    const found = page.data.data.find((item) => item.notification_id === id);
    if (found) return found;
  }

  return null;
}

export function useNotifications() {
  const queryClient = useQueryClient();

  const notificationsQuery = useInfiniteQuery<
    NotificationListResponse,
    Error,
    NotificationInfiniteData,
    ReturnType<typeof notificationKeys.infinite>,
    number
  >({
    queryKey: notificationKeys.infinite(),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getNotifications({
        page: pageParam,
        limit: PAGE_SIZE,
      }),
    getNextPageParam: (lastPage) => {
      const meta = lastPage.data.meta;
      return meta.currentPage < meta.totalPages
        ? meta.currentPage + 1
        : undefined;
    },
  });

  const unreadQuery = useQuery({
    queryKey: notificationKeys.unread(),
    queryFn: getUnreadCount,
    select: (res) => res.data.unread_count ?? 0,
  });

  const notifications =
    notificationsQuery.data?.pages.flatMap((page) => page.data.data) ?? [];

  const unreadCount = unreadQuery.data ?? 0;

  const markReadMutation = useMutation({
    mutationFn: (payload: MarkReadBody) => markRead(payload),
    onMutate: async (payload) => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: notificationKeys.infinite(),
        }),
        queryClient.cancelQueries({
          queryKey: notificationKeys.unread(),
        }),
      ]);

      const prevInfinite = queryClient.getQueryData<NotificationInfiniteData>(
        notificationKeys.infinite(),
      );
      const prevUnread = queryClient.getQueryData<number>(
        notificationKeys.unread(),
      );

      const changedUnreadCount =
        prevInfinite?.pages
          .flatMap((page) => page.data.data)
          .filter(
            (item) =>
              payload.notificationIds.includes(item.notification_id) &&
              !item.is_read,
          ).length ?? 0;

      queryClient.setQueryData<NotificationInfiniteData>(
        notificationKeys.infinite(),
        (oldData) =>
          updatePages(oldData, (items) =>
            items.map((item) =>
              payload.notificationIds.includes(item.notification_id) &&
              !item.is_read
                ? { ...item, is_read: true }
                : item,
            ),
          ),
      );

      if (changedUnreadCount > 0) {
        queryClient.setQueryData<number>(
          notificationKeys.unread(),
          (oldCount = 0) => Math.max(oldCount - changedUnreadCount, 0),
        );
      }

      return { prevInfinite, prevUnread };
    },
    onError: (_err, _payload, ctx) => {
      if (ctx?.prevInfinite) {
        queryClient.setQueryData(notificationKeys.infinite(), ctx.prevInfinite);
      }

      if (typeof ctx?.prevUnread === "number") {
        queryClient.setQueryData(notificationKeys.unread(), ctx.prevUnread);
      }
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: notificationKeys.infinite(),
        }),
        queryClient.invalidateQueries({
          queryKey: notificationKeys.unread(),
        }),
      ]);
    },
  });

  const deleteOneMutation = useMutation({
    mutationFn: (id: number) => deleteNotificationById(id),
    onMutate: async (id) => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: notificationKeys.infinite(),
        }),
        queryClient.cancelQueries({
          queryKey: notificationKeys.unread(),
        }),
      ]);

      const prevInfinite = queryClient.getQueryData<NotificationInfiniteData>(
        notificationKeys.infinite(),
      );
      const prevUnread = queryClient.getQueryData<number>(
        notificationKeys.unread(),
      );

      const target = findNotification(prevInfinite, id);

      queryClient.setQueryData<NotificationInfiniteData>(
        notificationKeys.infinite(),
        (oldData) =>
          updatePages(oldData, (items) =>
            items.filter((item) => item.notification_id !== id),
          ),
      );

      if (target && !target.is_read) {
        queryClient.setQueryData<number>(
          notificationKeys.unread(),
          (oldCount = 0) => Math.max(oldCount - 1, 0),
        );
      }

      return { prevInfinite, prevUnread };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prevInfinite) {
        queryClient.setQueryData(notificationKeys.infinite(), ctx.prevInfinite);
      }

      if (typeof ctx?.prevUnread === "number") {
        queryClient.setQueryData(notificationKeys.unread(), ctx.prevUnread);
      }
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: notificationKeys.infinite(),
        }),
        queryClient.invalidateQueries({
          queryKey: notificationKeys.unread(),
        }),
      ]);
    },
  });

  const deleteAllMutation = useMutation({
    mutationFn: deleteNotifications,
    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: notificationKeys.infinite(),
        }),
        queryClient.cancelQueries({
          queryKey: notificationKeys.unread(),
        }),
      ]);

      const prevInfinite = queryClient.getQueryData<NotificationInfiniteData>(
        notificationKeys.infinite(),
      );
      const prevUnread = queryClient.getQueryData<number>(
        notificationKeys.unread(),
      );

      queryClient.setQueryData<NotificationInfiniteData>(
        notificationKeys.infinite(),
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                data: [],
              },
            })),
          };
        },
      );

      queryClient.setQueryData<number>(notificationKeys.unread(), 0);

      return { prevInfinite, prevUnread };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prevInfinite) {
        queryClient.setQueryData(notificationKeys.infinite(), ctx.prevInfinite);
      }

      if (typeof ctx?.prevUnread === "number") {
        queryClient.setQueryData(notificationKeys.unread(), ctx.prevUnread);
      }
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: notificationKeys.infinite(),
        }),
        queryClient.invalidateQueries({
          queryKey: notificationKeys.unread(),
        }),
      ]);
    },
  });

  return {
    notifications,
    unreadCount,
    isLoading: notificationsQuery.isLoading,
    isFetchingNextPage: notificationsQuery.isFetchingNextPage,
    hasNextPage: notificationsQuery.hasNextPage,
    isEmpty: notifications.length === 0,
    fetchNextPage: notificationsQuery.fetchNextPage,
    markNotificationAsRead: (id: number) => {
      const target = notifications.find((item) => item.notification_id === id);

      if (!target || target.is_read) return;

      markReadMutation.mutate({ notificationIds: [id] });
    },
    removeNotification: (id: number) => deleteOneMutation.mutate(id),
    clearAllNotifications: () => deleteAllMutation.mutate(),
    isDeletingAll: deleteAllMutation.isPending,
    deletingId:
      typeof deleteOneMutation.variables === "number"
        ? deleteOneMutation.variables
        : null,
  };
}
