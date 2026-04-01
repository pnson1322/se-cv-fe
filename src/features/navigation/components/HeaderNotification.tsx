"use client";

import { Bell, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type NotificationItem = {
  id: number;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Hồ sơ được duyệt",
    description: "Công ty ABC đã xem hồ sơ của bạn",
    time: "5 phút trước",
    unread: true,
  },
  {
    id: 2,
    title: "Lời mời phỏng vấn",
    description: "Công ty XYZ mời bạn phỏng vấn vào 10:00 ngày 5/2",
    time: "1 giờ trước",
    unread: true,
  },
  {
    id: 3,
    title: "Tin tuyển dụng mới",
    description: "5 tin tuyển dụng mới phù hợp với bạn",
    time: "2 giờ trước",
    unread: false,
  },
];

export default function HeaderNotification() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((item) => item.unread).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item)),
    );
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative rounded-xl p-1 text-white/92 transition hover:bg-white/10 hover:text-white"
        aria-label="Mở thông báo"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute -right-1.5 -top-1.5 min-w-5 rounded-full bg-red-500 px-1.5 text-center text-[11px] font-bold leading-5 text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-210 w-[92vw] max-w-107.5 overflow-hidden rounded-[22px] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
          <div className="flex items-center justify-between bg-linear-to-r from-cyan-500 to-cyan-600 px-5 py-4 text-white">
            <h3 className="text-[1.5rem] font-bold sm:text-[1.7rem]">
              Thông báo
            </h3>
            {unreadCount > 0 && (
              <span className="rounded-full bg-white/18 px-3.5 py-1 text-[0.95rem] font-medium sm:text-[1rem]">
                {unreadCount} mới
              </span>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Bell size={22} />
              </div>
              <p className="mt-4 text-[1rem] font-semibold text-slate-700">
                Chưa có thông báo nào
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Thông báo mới sẽ xuất hiện tại đây.
              </p>
            </div>
          ) : (
            <div className="max-h-[70vh] overflow-y-auto">
              {notifications.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => markAsRead(item.id)}
                  className={`group flex w-full items-start gap-4 border-b border-slate-100 px-5 py-4 text-left transition ${
                    item.unread
                      ? "bg-cyan-50/60 hover:bg-cyan-50"
                      : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-fuchsia-500 text-white">
                    <Bell size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[1rem] font-bold text-[#111827]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[0.98rem] leading-7 text-slate-600">
                          {item.description}
                        </p>
                        <p className="mt-2 text-[0.94rem] text-slate-400">
                          {item.time}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.unread && (
                          <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-cyan-500" />
                        )}

                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(item.id);
                          }}
                          className="mt-0.5 hidden rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 group-hover:inline-flex"
                        >
                          <X size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
