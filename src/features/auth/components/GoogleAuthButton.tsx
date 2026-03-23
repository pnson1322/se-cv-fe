import { Chrome } from "lucide-react";

type GoogleAuthButtonProps = {
  mode: "login" | "register";
};

export default function GoogleAuthButton({ mode }: GoogleAuthButtonProps) {
  const label =
    mode === "login" ? "Đăng nhập bằng Google" : "Đăng ký bằng Google";

  const handleClick = () => {
    console.log(`${mode} with Google`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-(--color-border) bg-white px-4 py-3 font-medium text-(--color-text) shadow-sm transition hover:bg-slate-50"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-primary)/10 text-(--color-primary)">
        <Chrome size={16} strokeWidth={2.2} />
      </div>
      <span>{label}</span>
    </button>
  );
}
