import FullScreenLoader from "@/components/molecules/loader/FullScreenLoader";
import { redirect } from "next/navigation";

export default async function Home() {
  // if (typeof window === "undefined") return <FullScreenLoader />;
  return redirect("/dashboard");
}
