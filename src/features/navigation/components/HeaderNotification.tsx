"use client";

import { Bell, Loader2, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNotifications } from "@/features/notification/hooks/useNotification";

type HeaderNotificationProps = {
  onOpenChange?: (open: boolean) => void;
};

function formatNotificationTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const diffMs = Date.now() - date.getTime();

  if (diffMs < 0) {
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  }

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "Vừa xong";

  if (diffMs < hour) {
    const minutes = Math.floor(diffMs / minute);
    return `${minutes} phút trước`;
  }

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `${hours} giờ trước`;
  }

  if (diffMs < 7 * day) {
    const days = Math.floor(diffMs / day);
    return `${days} ngày trước`;
  }

  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export default function HeaderNotification({
  onOpenChange,
}: HeaderNotificationProps) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    notifications,
    unreadCount,
    isLoading,
    isEmpty,
    isDeletingAll,
    deletingId,
    markNotificationAsRead,
    removeNotification,
    clearAllNotifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNotifications();

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open || !scrollRef.current || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: scrollRef.current,
        rootMargin: "100px",
        threshold: 0.1,
      },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [open, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleItemClick = (notificationId: number) => {
    markNotificationAsRead(notificationId);
  };

  const handleItemKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    notificationId: number,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      markNotificationAsRead(notificationId);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={handleToggleOpen}
        className="relative rounded-lg p-1 text-white/92 transition hover:bg-white/10 hover:text-white"
        aria-label="Mở thông báo"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-500 px-1 text-center text-[12px] font-bold leading-4.5 text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-210 w-[88vw] max-w-96 overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_rgba(15,23,42,0.16)]">
          <div className="bg-linear-to-r from-cyan-500 to-cyan-600 px-4 py-3.5 text-white">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[1.15rem] font-bold sm:text-[1.25rem]">
                Thông báo
              </h3>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <span className="rounded-full bg-white/18 px-2.5 py-1 text-[12px] font-medium">
                    {unreadCount} mới
                  </span>
                )}

                {!isEmpty && (
                  <button
                    type="button"
                    onClick={clearAllNotifications}
                    disabled={isDeletingAll}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1.5 text-[12px] font-medium transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isDeletingAll ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Trash2 size={13} />
                    )}
                    Xóa tất cả
                  </button>
                )}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center px-5 py-8">
              <Loader2 className="animate-spin text-slate-400" size={20} />
            </div>
          ) : isEmpty ? (
            <div className="px-5 py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Bell size={20} />
              </div>
              <p className="mt-3 text-[15px] font-semibold text-slate-700">
                Chưa có thông báo nào
              </p>
              <p className="mt-1 text-[13px] text-slate-400">
                Thông báo mới sẽ xuất hiện tại đây.
              </p>
            </div>
          ) : (
            <div ref={scrollRef} className="max-h-[65vh] overflow-y-auto">
              {notifications.map((item) => (
                <div
                  key={item.notification_id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleItemClick(item.notification_id)}
                  onKeyDown={(event) =>
                    handleItemKeyDown(event, item.notification_id)
                  }
                  className={`group flex w-full cursor-pointer items-start gap-3 border-b border-slate-100 px-4 py-3.5 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
                    !item.is_read
                      ? "bg-cyan-50/60 hover:bg-cyan-50"
                      : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-fuchsia-500 text-white">
                    <Bell size={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[14px] font-bold text-[#111827]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[14px] leading-6 text-slate-600">
                          {item.message}
                        </p>
                        <p className="mt-1.5 text-[12px] text-slate-400">
                          {formatNotificationTime(item.created_at)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {!item.is_read && (
                          <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-500" />
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(item.notification_id);
                          }}
                          disabled={deletingId === item.notification_id}
                          className="mt-0.5 hidden rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 group-hover:inline-flex disabled:cursor-not-allowed disabled:opacity-60"
                          aria-label="Xóa thông báo"
                        >
                          {deletingId === item.notification_id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <X size={14} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div ref={loadMoreRef} className="py-3 text-center">
                {isFetchingNextPage ? (
                  <Loader2
                    className="mx-auto animate-spin text-slate-400"
                    size={16}
                  />
                ) : hasNextPage ? (
                  <span className="text-[12px] text-slate-400">
                    Kéo xuống để tải thêm
                  </span>
                ) : (
                  <span className="text-[12px] text-slate-400">
                    Đã tải hết thông báo
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
