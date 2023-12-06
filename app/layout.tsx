import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript, Flowbite } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shift Management System",
  description: "Assessment Task by One Facilities Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}>
        <ToastContainer />
        <Flowbite theme={{ mode: "light" }}>{children}</Flowbite>
      </body>
    </html>
  );
}
