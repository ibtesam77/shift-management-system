"use client";

import { redirect } from "next/navigation";
import useAuth from "@/custom-hooks/useAuth";
import FullScreenLoader from "@/components/molecules/loader/FullScreenLoader";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <FullScreenLoader />;

  if (isAuthenticated) return redirect("/dashboard");

  return children;
}
