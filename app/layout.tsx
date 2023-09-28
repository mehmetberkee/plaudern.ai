import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { UserProvider } from "./contexts/userContext";
import Header from "./components/Header";
const ubuntu = Roboto({
  weight: ["400", "500", "700"],
  display: "swap",
  subsets: ["latin"],
  variable: "--roboto-font",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={ubuntu.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
