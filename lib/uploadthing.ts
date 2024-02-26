import { generateReactHelpers } from "@uploadthing/react";
// import { UTApi } from "uploadthing/server";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
