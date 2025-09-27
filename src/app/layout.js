import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "./AppLayout"; // NEW client layout

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Smart Caliper App",
  description: "by CodeAndDesign",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}