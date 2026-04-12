"use client";

export default function CompanyDetailItem({
  icon,
  label,
  value,
  isLink = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLink?: boolean;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="mt-0.5 text-slate-400">{icon}</div>
      <div>
        <p className="text-[0.92rem] font-medium text-slate-500">{label}</p>
        {isLink ? (
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block text-[0.98rem] font-bold text-cyan-600 transition hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="mt-1 text-[0.98rem] font-bold text-[#0F172A]">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}
