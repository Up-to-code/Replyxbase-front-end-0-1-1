import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
// Removed auth dependency - no backend needed
const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Avatar uploader for user profiles
  avatarUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      // Mock user - no auth needed
      return { userId: 'mock-user-id' };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Avatar upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      // Return data to be accessible on client-side
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  // Organization logo uploader
  organizationLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      // Mock user - no auth needed
      return { userId: 'mock-user-id' };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Organization logo upload complete");
      console.log("File URL:", file.url);
      
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

