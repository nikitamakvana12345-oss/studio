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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Download, Loader2, Music, Video } from "lucide-react";
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid YouTube URL." }),
});

type DownloadState = {
  format: 'MP4' | 'MP3';
  progress: number;
  isDownloading: boolean;
};

export function Downloader() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoDetails, setVideoDetails] = useState<{ title: string; thumbnailUrl: string } | null>(null);
  const [downloadState, setDownloadState] = useState<DownloadState | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsProcessing(true);
    setVideoDetails(null);
    setDownloadState(null);

    setTimeout(() => {
      try {
        const url = new URL(values.url);
        if (!/youtube\.com|youtu\.be/.test(url.hostname)) {
          throw new Error("Invalid YouTube URL");
        }
        setVideoDetails({
          title: "Your Awesome YouTube Video Title",
          thumbnailUrl: "https://placehold.co/480x270.png",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Invalid URL",
          description: "Could not extract video details. Please check the URL and try again.",
        });
        setVideoDetails(null);
      }
      setIsProcessing(false);
    }, 2000);
  }

  const handleDownload = (format: 'MP4' | 'MP3') => {
    setDownloadState({ format, progress: 0, isDownloading: true });
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row items-start gap-2">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="https://www.youtube.com/watch?v=..." {...field} className="text-base h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isProcessing} className="w-full sm:w-auto h-12 text-base shrink-0">
                {isProcessing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Fetch Video
              </Button>
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
              <div className="w-full md:w-1/3 shrink-0">
                <Image
                  src={videoDetails.thumbnailUrl}
                  alt={videoDetails.title}
                  width={480}
                  height={270}
                  className="object-cover w-full h-auto rounded-lg"
                  data-ai-hint="video thumbnail"
                />
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <h3 className="text-xl font-bold">{videoDetails.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button onClick={() => handleDownload('MP4')} size="lg" disabled={downloadState?.isDownloading}>
                    <Download className="mr-2" /> Download MP4
                  </Button>
                  <Button onClick={() => handleDownload('MP3')} size="lg" variant="secondary" disabled={downloadState?.isDownloading}>
                    <Music className="mr-2" /> Download MP3
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
