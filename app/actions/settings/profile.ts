"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: {
  name?: string;
  bio?: string;
  image?: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.image && { image: data.image }),
        // Note: bio might need to be added to the User model if it doesn't exist
        // For now, we'll skip it or store it in metadata
      },
    });

    revalidatePath("/dashboard/settings");
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function updateAvatar(imageUrl: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl },
    });

    revalidatePath("/dashboard/settings");
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Failed to update avatar:", error);
    return { success: false, error: "Failed to update avatar" };
  }
}


