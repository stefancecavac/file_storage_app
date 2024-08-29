/* eslint-disable react-refresh/only-export-components */
import { z } from "zod";

export const TypeEnum = z.enum([
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "csv",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "svg",
  "webp",
]);

export const fileSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  mimeType: z.string(),
  size: z.number(),
  url: z.string(),
  type: TypeEnum,
  createdAt: z.date().optional().default(new Date()),
  updatedAt: z.date().optional().default(new Date()),
  user: z.object({ email: z.string() }),
});

export const userSchema = z.object({
  id: z.number().optional(),
  email: z.string().min(1, { message: "Please fill out this field" }),
  password: z.string().min(1, { message: "Please fill out this field" }),
});

export const folderSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: "Folder needs to have at least 1 character in its name",
  }),
  file: z.array(fileSchema).optional(),
  _count: z.object({ File: z.number() }).optional(),
  user: z.object({ email: z.string() }).optional(),
  parentFolderId: z.number().optional(),
  parentFolder: z.object({ name: z.string() }).optional(),
  subfolders: z.array(z.lazy(() => folderSchema)).optional(),
  createdAt: z.date().optional().default(new Date()),
  updatedAt: z.date().optional().default(new Date()),
  breadCrumb: z
    .array(z.object({ id: z.number(), name: z.string() }))
    .optional(),
});

export type fileData = z.infer<typeof fileSchema>;
export type folderData = z.infer<typeof folderSchema>;

export type userData = z.infer<typeof userSchema>;
