"use client";

type Props = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

export default function CompanyFormField({
  label,
  required = false,
  children,
}: Props) {
  return (
    <label className="block">
      <span className="mb-2 block text-[14px] font-semibold text-slate-800">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}
