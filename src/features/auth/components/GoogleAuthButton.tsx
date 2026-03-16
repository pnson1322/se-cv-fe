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
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 font-medium text-(--color-text) transition hover:bg-slate-50"
    >
      <span>{label}</span>
    </button>
  );
}
