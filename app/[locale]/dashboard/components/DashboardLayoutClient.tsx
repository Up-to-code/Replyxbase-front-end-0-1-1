"use client";

import dynamic from "next/dynamic";
import { AppLayoutProps } from "@/components/layout/AppLayout/types";
import Loading from "../../loading";

// Dynamically import AppLayout with SSR disabled to avoid context issues
const AppLayout = dynamic(
  () => import("@/components/layout/AppLayout").then((mod) => ({ default: mod.AppLayout })),
  { 
    ssr: false,
    loading: () => (
   <Loading />
    )
  }
);

export function DashboardLayoutClient({ children, agents }: AppLayoutProps) {
  return <AppLayout agents={agents}>{children}</AppLayout>;
}

