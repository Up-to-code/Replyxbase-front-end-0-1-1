import React, { Suspense } from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { unstable_cache } from "next/cache";
import { SettingsClient } from "./components/SettingsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import SettingsLoading from "./loading";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.Settings" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

// Cached function to get user data
const getCachedUser = unstable_cache(
  async (userId: string) => {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  },
  ["settings-user"],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ["user-profile"],
  }
);

// Cached function to get organization data
const getCachedOrganization = unstable_cache(
  async (organizationId: string) => {
    return prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        members: {
          include: {
            user: true
          }
        }
      }
    });
  },
  ["settings-organization"],
  {
    revalidate: 300, // Cache for 5 minutes
    tags: ["organization", "members"],
  }
);

async function SettingsContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || !session.session.activeOrganizationId) {
    return notFound();
  }

  const [user, organization] = await Promise.all([
    getCachedUser(session.user.id),
    getCachedOrganization(session.session.activeOrganizationId),
  ]);

  if (!user || !organization) {
    return notFound();
  }

  return <SettingsClient user={user} organization={organization} />;
}

export default async function SettingsPage() {
  return (
    <Suspense fallback={<SettingsLoading />}>
      <SettingsContent />
    </Suspense>
  );
}
