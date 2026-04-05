"use client";

export default function CompanySectionCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white px-5 py-5 space-y-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] md:px-6 md:py-5">
      {children}
    </section>
  );
}
