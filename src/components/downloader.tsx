
"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Download, Loader2, Video, ClipboardPaste } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid YouTube URL." }),
});

type VideoDetails = {
  title: string;
  videoId: string;
};

type DownloadState = {
  format: 'MP4';
  progress: number;
  isDownloading: boolean;
};

export function Downloader() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [downloadState, setDownloadState] = useState<DownloadState | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const getYouTubeVideoId = (url: string): string | null => {
    let videoId: string | null = null;
    try {
      const urlObject = new URL(url);
      const hostname = urlObject.hostname;
      
      if (hostname.includes('youtube.com')) {
        if (urlObject.pathname.includes('/watch')) {
          videoId = urlObject.searchParams.get('v');
        } else if (urlObject.pathname.includes('/shorts/')) {
          videoId = urlObject.pathname.split('/shorts/')[1].split('?')[0];
        } else if (urlObject.pathname.includes('/embed/')) {
          videoId = urlObject.pathname.split('/embed/')[1].split('?')[0];
        }
      } else if (hostname.includes('youtu.be')) {
        videoId = urlObject.pathname.slice(1).split('?')[0];
      }
    } catch (error) {
      // Invalid URL format, fallback to regex
    }

    if (!videoId) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
        const match = url.match(regex);
        if (match) {
            videoId = match[1];
        }
    }
    
    return videoId;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsProcessing(true);
    setVideoDetails(null);
    setDownloadState(null);

    try {
      const videoId = getYouTubeVideoId(values.url);

      if (!videoId) {
        throw new Error("Invalid YouTube URL. Could not extract video ID.");
      }
      
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`;
      const response = await fetch(oembedUrl);

      if (!response.ok) {
        const errorData = await response.text();
        console.error("YouTube oEmbed error:", errorData);
        throw new Error("Could not extract video details. The video might be private, region-locked, or removed.");
      }

      const data = await response.json();
      
      setVideoDetails({
        title: data.title,
        videoId: videoId,
      });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching video",
        description: error.message || "Could not extract video details. Please check the URL and try again.",
      });
      setVideoDetails(null);
    } finally {
      setIsProcessing(false);
    }
  }

  const handleDownload = (format: 'MP4') => {
    setDownloadState({ format, progress: 0, isDownloading: true });
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        form.setValue("url", text);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to paste",
        description: "Could not read from clipboard. Please paste manually.",
      });
    }
  };
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (downloadState?.isDownloading && downloadState.progress < 100) {
      timer = setTimeout(() => {
        setDownloadState(prev => prev ? { ...prev, progress: prev.progress + 5 } : null);
      }, 150);
    } else if (downloadState?.progress === 100) {
      toast({
        title: "Download Complete!",
        description: `Your ${downloadState.format} file is ready.`,
        className: "bg-accent text-accent-foreground border-green-300"
      });
      setTimeout(() => {
        setDownloadState(prev => prev ? { ...prev, isDownloading: false } : null);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [downloadState, toast]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
          Media Bitesz
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Download YouTube videos and audio quickly and easily. Paste a link to get started.
        </p>
      </div>

      <Card className="w-full shadow-lg border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            <span>YouTube Downloader</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="https://www.youtube.com/watch?v=..."
                          {...field}
                          className="text-base h-12 pr-12"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-1/2 right-1 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-primary"
                          onClick={handlePaste}
                          aria-label="Paste URL"
                        >
                          <ClipboardPaste className="h-5 w-5" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                  <Button type="submit" disabled={isProcessing} className="h-12 text-base px-8">
                    {isProcessing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    Fetch Video
                  </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isProcessing && (
        <div className="flex justify-center items-center flex-col gap-4 text-muted-foreground py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Analyzing link...</p>
        </div>
      )}

      {videoDetails && (
        <Card className="w-full shadow-lg animate-in fade-in-50 duration-500">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/3 shrink-0 aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoDetails.videoId}`}
                  title={videoDetails.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                  data-ai-hint="video embed"
                ></iframe>
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <h3 className="text-xl font-bold">{videoDetails.title}</h3>
                <div className="flex justify-center">
                  <Button onClick={() => handleDownload('MP4')} size="lg" disabled={downloadState?.isDownloading}>
                    <Download className="mr-2" /> Download MP4
                  </Button>
                </div>
              </div>
            </div>
            {downloadState?.isDownloading && (
               <div className="space-y-2 pt-6">
                 <p className="text-sm font-medium text-center">Downloading {downloadState.format}... {downloadState.progress}%</p>
                 <Progress value={downloadState.progress} className="w-full h-3 [&>div]:bg-accent" />
               </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="mt-8 flex justify-center">
        <div className="w-full h-24 bg-muted/50 border border-dashed rounded-lg flex items-center justify-center text-muted-foreground">
          AdSense Ad Slot
        </div>
      </div>
    </div>
  );
}
