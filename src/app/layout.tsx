import "./globals.css";
import { Be_Vietnam_Pro } from "next/font/google";
import ReactQueryProviders from "../components/Providers/react-query-provider";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { Toaster } from "sonner";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={beVietnam.className}>
        <ReactQueryProviders>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                style: {
                  borderRadius: "14px",
                },
              }}
            />
          </AuthProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
