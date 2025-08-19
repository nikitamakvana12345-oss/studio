'use server';
/**
 * @fileOverview A flow for generating relevant Instagram hashtags for a YouTube video.
 *
 * - generateInstagramHashtags - A function that handles the hashtag generation process.
 * - GenerateInstagramHashtagsInput - The input type for the generateInstagramHashtags function.
 * - GenerateInstagramHashtagsOutput - The return type for the generateInstagramHashtags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInstagramHashtagsInputSchema = z.object({
  videoUrl: z.string().describe('The URL of the YouTube video.'),
});
export type GenerateInstagramHashtagsInput = z.infer<typeof GenerateInstagramHashtagsInputSchema>;

const GenerateInstagramHashtagsOutputSchema = z.object({
  hashtags: z
    .string()
    .describe('A comma-separated list of relevant Instagram hashtags for the video.'),
});
export type GenerateInstagramHashtagsOutput = z.infer<typeof GenerateInstagramHashtagsOutputSchema>;

export async function generateInstagramHashtags(
  input: GenerateInstagramHashtagsInput
): Promise<GenerateInstagramHashtagsOutput> {
  return generateInstagramHashtagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInstagramHashtagsPrompt',
  input: {schema: GenerateInstagramHashtagsInputSchema},
  output: {schema: GenerateInstagramHashtagsOutputSchema},
  prompt: `You are an expert in social media marketing, specializing in generating relevant Instagram hashtags for YouTube videos.

  Given the following YouTube video URL, analyze its content and suggest a comma-separated list of trending and relevant Instagram hashtags to maximize its visibility.

  Video URL: {{{videoUrl}}}

  Ensure the hashtags are specific, popular, and suitable for the video's content.
  Limit the response to a comma-separated list of hashtags only, without any additional explanations or introductory phrases. For example: "#travel, #vlog, #youtube, #adventure".`,
});

const generateInstagramHashtagsFlow = ai.defineFlow(
  {
    name: 'generateInstagramHashtagsFlow',
    inputSchema: GenerateInstagramHashtagsInputSchema,
    outputSchema: GenerateInstagramHashtagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
