'use client';

import type { VideoInfoInput, VideoInfo } from '@/ai/schemas/video-info-schemas';

function extractYouTubeId(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);
    if (url.hostname === 'youtu.be') {
      return url.pathname.slice(1) || null;
    }
    if (url.hostname.includes('youtube.com')) {
      const v = url.searchParams.get('v');
      if (v) return v;
      const match = url.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{6,})/);
      if (match) return match[1];
    }
  } catch {
    // ignore
  }
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})(?:[&?#]|$)/;
  const match = rawUrl.match(regex);
  return match ? match[1] : null;
}

async function fetchYouTubeTitle(youtubeUrl: string): Promise<string> {
  // Attempt YouTube oEmbed; fallback to generic title on failure
  const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(youtubeUrl)}&format=json`;
  const response = await fetch(oembedUrl, { method: 'GET' });
  if (!response.ok) throw new Error('oEmbed request failed');
  const data = await response.json();
  return (data && data.title) ? String(data.title) : 'YouTube Video';
}

export async function getVideoInfo(input: VideoInfoInput): Promise<VideoInfo> {
  const { youtubeUrl } = input;
  const videoId = extractYouTubeId(youtubeUrl);
  if (!videoId) {
    throw new Error('Could not extract video ID from the URL.');
  }

  let title = 'YouTube Video';
  try {
    title = await fetchYouTubeTitle(youtubeUrl);
  } catch {
    // leave default title
  }

  // In a purely static build we cannot compute a direct MP4 link.
  // Provide the canonical YouTube URL so users can open it.
  return {
    videoId,
    title,
    downloadUrl: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

