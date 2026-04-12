"use client";

export default function CompanyStatCard({
  icon,
  value,
  label,
  iconBg,
  iconColor,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-[1.6rem] font-extrabold tracking-[-0.02em] text-[#0F172A] md:text-[1.8rem]">
            {value}
          </p>
          <p className="text-[0.9rem] font-medium text-slate-500">{label}</p>
        </div>
      </div>
    </div>
  );
}
