"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { PageSkeleton } from "./Skeletons";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    // session লোড শেষ হওয়ার পরই শুধু যাচাই করবো
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  if (isPending) return <PageSkeleton />;
  if (!session) return null;
  return children;
}