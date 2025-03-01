import { UploadDropzone, UploadButton, Uploader, generateReactHelpers } from '@uploadthing/react';

import type { OurFileRouter } from '@/app/api/uploadthing/core';


export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

export { UploadDropzone, UploadButton, Uploader };