
'use server';

/**
 * @fileoverview A Genkit flow for extracting YouTube video information.
 *
 * This file defines a flow that takes a YouTube URL, extracts the video ID
 * and title using an AI prompt, and then uses @distube/ytdl-core to get a direct

 * download URL for the video.
 */

import { ai } from '@/ai/genkit';
import {
  VideoInfoInputSchema,
  VideoInfoSchema,
  type VideoInfoInput,
  type VideoInfo,
} from '@/ai/schemas/video-info-schemas';
import ytdl from '@distube/ytdl-core';
import { z } from 'zod';

const YtdlOutputSchema = z.object({
  videoId: z.string().describe("The unique identifier of the YouTube video."),
  title: z.string().describe("The title of the YouTube video."),
});


// Define the prompt for extracting video ID and title from a URL
const videoDetailsPrompt = ai.definePrompt({
  name: 'videoDetailsPrompt',
  input: { schema: VideoInfoInputSchema },
  output: { schema: YtdlOutputSchema },
  prompt: `
    You are an expert at parsing YouTube URLs.
    Extract the videoId and the title from the provided YouTube URL.
    The videoId is the unique identifier in the URL (e.g., in 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', the videoId is 'dQw4w9WgXcQ').
    For the title, just use the videoId as a placeholder. We will fetch the real title later.

    YouTube URL: {{{youtubeUrl}}}
  `,
});

// Define the Genkit flow
export const getVideoInfoFlow = ai.defineFlow(
  {
    name: 'getVideoInfoFlow',
    inputSchema: VideoInfoInputSchema,
    outputSchema: VideoInfoSchema,
  },
  async (input) => {
    // Step 1: Use the AI prompt to extract the videoId and a placeholder title
    const { output } = await videoDetailsPrompt(input);
    if (!output?.videoId) {
      throw new Error('Could not extract video ID from the URL.');
    }
    const { videoId } = output;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;


    // Step 2: Use ytdl-core to get the full video info and download URL
    try {
      const info = await ytdl.getInfo(videoUrl);

      const format = ytdl.chooseFormat(info.formats, {
        quality: 'highest',
        filter: (format) =>
          format.container === 'mp4' &&
          format.hasVideo &&
          format.hasAudio,
      });

      if (!format) {
         // Fallback to the best available format if no combined format is found
        const fallbackFormat = ytdl.chooseFormat(info.formats, { quality: 'highest' });
        if (!fallbackFormat) {
          throw new Error('No suitable format was found for this video.');
        }
         return {
          videoId,
          title: info.videoDetails.title,
          downloadUrl: fallbackFormat.url,
        };
      }

      return {
        videoId,
        title: info.videoDetails.title,
        downloadUrl: format.url,
      };
    } catch (error: any) {
        console.error('ytdl error:', error);
        // Be more specific about the error if possible
        if (error.message.includes('private')) {
          throw new Error('This video is private and cannot be downloaded.');
        }
        if (error.message.includes('age-restricted')) {
            throw new Error('This video is age-restricted and cannot be downloaded.');
        }
        throw new Error('Failed to get video information. The video may be unavailable or there was a network issue.');
    }
  }
);

// Export a wrapper function for client-side use
export async function getVideoInfo(input: VideoInfoInput): Promise<VideoInfo> {
  return await getVideoInfoFlow(input);
}
