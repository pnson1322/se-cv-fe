import "./globals.css";
import ReactQueryProviders from "../components/Providers/react-query-provider";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
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
