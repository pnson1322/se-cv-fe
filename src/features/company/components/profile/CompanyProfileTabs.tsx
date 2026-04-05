"use client";

export type ProfileTab = "about" | "jobs" | "reviews";

type Props = {
  tabs: ProfileTab[];
  activeTab: ProfileTab;
  onChange: (tab: ProfileTab) => void;
  reviewCount?: number;
};

export default function CompanyProfileTabs({
  tabs,
  activeTab,
  onChange,
  reviewCount = 0,
}: Props) {
  return (
    <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
      {tabs.map((tab) => {
        const label =
          tab === "about"
            ? "Giới thiệu"
            : tab === "jobs"
              ? "Tin tuyển dụng đang tuyển"
              : `Đánh giá (${reviewCount})`;

        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={`rounded-lg px-4 py-2 text-[14px] font-semibold transition ${
              activeTab === tab
                ? "bg-[#1E3A8A] text-white shadow-sm"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
