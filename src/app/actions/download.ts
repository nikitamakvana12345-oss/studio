
'use server';

import ytdl from 'ytdl-core';

export async function getVideoInfo(videoId: string) {
  try {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const info = await ytdl.getInfo(videoUrl);

    // Prefer MP4 formats that have both video and audio
    const format = ytdl.chooseFormat(info.formats, { 
      quality: 'highest',
      filter: (format) => 
        format.container === 'mp4' && 
        format.hasVideo && 
        format.hasAudio
    });
    
    if (!format) {
      throw new Error('No suitable MP4 format with both video and audio was found for this video.');
    }

    return {
      videoUrl: format.url,
      title: info.videoDetails.title.replace(/[^a-zA-Z0-9\s]/g, ''), // Sanitize title
    };
  } catch (error: any) {
    console.error('ytdl error:', error);
    throw new Error('Failed to get video information. The video may be private, age-restricted, or unavailable.');
  }
}
