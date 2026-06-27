import { createServerFn } from "@tanstack/react-start";
import fs from "node:fs/promises";
import path from "node:path";
import type { Chapter } from "./data";

const dataDir = path.join(process.cwd(), "src", "data", "chapters");
const imageDir = path.join(process.cwd(), "public", "images", "chapters");

export const listChapters = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const files = await fs.readdir(dataDir);
    const chapters: Chapter[] = [];
    for (const file of files) {
      if (file.endsWith(".json")) {
        const content = await fs.readFile(path.join(dataDir, file), "utf-8");
        chapters.push(JSON.parse(content));
      }
    }
    return chapters;
  } catch (error) {
    console.error("Failed to list chapters", error);
    return [];
  }
});

export const saveChapter = createServerFn({ method: "POST" })
  .validator((d: Chapter) => d)
  .handler(async ({ data }) => {
    try {
      const filePath = path.join(dataDir, `${data.id}.json`);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      return { success: true };
    } catch (error) {
      console.error("Failed to save chapter", error);
      throw new Error("Failed to save chapter");
    }
  });

export const deleteChapter = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    try {
      const filePath = path.join(dataDir, `${data.id}.json`);
      await fs.unlink(filePath);
      return { success: true };
    } catch (error) {
      console.error("Failed to delete chapter", error);
      throw new Error("Failed to delete chapter");
    }
  });

export const uploadImage = createServerFn({ method: "POST" })
  .validator((d: { base64: string; filename: string }) => d)
  .handler(async ({ data }) => {
    try {
      await fs.mkdir(imageDir, { recursive: true });
      const base64Data = data.base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const filePath = path.join(imageDir, data.filename);
      await fs.writeFile(filePath, buffer);
      return { success: true, url: `/images/chapters/${data.filename}` };
    } catch (error) {
      console.error("Failed to upload image", error);
      throw new Error("Failed to upload image");
    }
  });
