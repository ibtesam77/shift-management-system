"use client";

import { redirect } from "next/navigation";
import useAuth from "@/custom-hooks/useAuth";
import FullScreenLoader from "@/components/molecules/loader/FullScreenLoader";
import Sidebar from "@/components/organisms/layout/Sidebar";
import TopNav from "@/components/organisms/layout/TopNav";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <FullScreenLoader />;

  if (!isAuthenticated) return redirect("/auth/login");

  return (
    <div>
      <TopNav />
      <Sidebar />
      <div className="p-4 mt-16 sm:ml-64">{children}</div>
    </div>
  );
}
