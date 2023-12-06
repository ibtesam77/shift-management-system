"use client";

import { redirect } from "next/navigation";
import useAuth from "@/custom-hooks/useAuth";
import SimpleSpinner from "@/components/atoms/spinners/simple";
import { Department } from "@prisma/client";

export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, loggedInEmployee } = useAuth();

  if (isLoading) return <SimpleSpinner />;

  if (loggedInEmployee?.department !== Department.HR)
    return redirect("/shifts");

  return children;
}
