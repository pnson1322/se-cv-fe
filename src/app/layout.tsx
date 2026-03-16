import "./globals.css";
import ReactQueryProviders from "../components/Providers/react-query-provider";
import { AuthProvider } from "@/features/auth/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <ReactQueryProviders>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
