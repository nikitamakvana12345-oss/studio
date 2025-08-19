/**
 * @fileoverview Defines the schemas for video information retrieval.
 */
import { z } from "zod";

export const VideoInfoInputSchema = z.object({
  youtubeUrl: z.string().url().describe("The URL of the YouTube video."),
});

export const VideoInfoSchema = z.object({
  videoId: z.string().describe("The unique identifier of the YouTube video."),
  title: z.string().describe("The title of the YouTube video."),
  downloadUrl: z.string().url().describe("The direct URL to download the video file."),
});

export type VideoInfoInput = z.infer<typeof VideoInfoInputSchema>;
export type VideoInfo = z.infer<typeof VideoInfoSchema>;
