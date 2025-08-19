'use server';
/**
 * @fileOverview A flow to fetch YouTube video information.
 *
 * - getVideoInfo - A function that fetches video details from a YouTube URL.
 * - GetVideoInfoInput - The input type for the getVideoInfo function.
 * - GetVideoInfoOutput - The return type for the getVideoInfo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import ytdl from 'ytdl-core';

const GetVideoInfoInputSchema = z.object({
  url: z.string().url().describe('The YouTube video URL.'),
});
export type GetVideoInfoInput = z.infer<typeof GetVideoInfoInputSchema>;

const GetVideoInfoOutputSchema = z.object({
  title: z.string().describe('The title of the video.'),
  thumbnailUrl: z.string().url().describe('The URL of the video thumbnail.'),
});
export type GetVideoInfoOutput = z.infer<typeof GetVideoInfoOutputSchema>;

const getVideoInfoFlow = ai.defineFlow(
  {
    name: 'getVideoInfoFlow',
    inputSchema: GetVideoInfoInputSchema,
    outputSchema: GetVideoInfoOutputSchema,
  },
  async (input) => {
    try {
      const videoInfo = await ytdl.getInfo(input.url);
      const thumbnailUrl = videoInfo.videoDetails.thumbnails.pop()?.url;
      if (!thumbnailUrl) {
        throw new Error('Could not find thumbnail for the video.');
      }
      return {
        title: videoInfo.videoDetails.title,
        thumbnailUrl: thumbnailUrl,
      };
    } catch (error) {
      console.error('Error fetching video info:', error);
      throw new Error('Could not fetch video information. Please check the URL.');
    }
  }
);

export async function getVideoInfo(
  input: GetVideoInfoInput
): Promise<GetVideoInfoOutput> {
  return await getVideoInfoFlow(input);
}
