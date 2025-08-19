
"use client";

import { useState } from "react";
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
import { Download, Loader2, Video, ClipboardPaste } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getVideoInfo } from "@/ai/flows/get-video-info-flow";
import type { VideoInfo } from "@/ai/schemas/video-info-schemas";


const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid YouTube URL." }),
});

export function Downloader() {
  const [isFetching, setIsFetching] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [videoDetails, setVideoDetails] = useState<VideoInfo | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsFetching(true);
    setVideoDetails(null);

    try {
      const result = await getVideoInfo({ youtubeUrl: values.url });
      setVideoDetails(result);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching video",
        description: error.message || "Could not fetch video details. Please check the URL and try again.",
      });
      setVideoDetails(null);
    } finally {
      setIsFetching(false);
    }
  }

  const handleDownload = async () => {
    if (!videoDetails?.downloadUrl) return;

    setIsDownloading(true);

    try {
      // Open the video URL in a new tab
      window.open(videoDetails.downloadUrl, '_blank');

      toast({
          title: "Redirecting to Download",
          description: "Your video is opening in a new tab.",
      });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: error.message || "Could not get the download link. Please try again.",
      });
    } finally {
        setIsDownloading(false);
    }
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
                  <Button type="submit" disabled={isFetching} className="h-12 text-base px-8">
                    {isFetching ? (
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
      
      {isFetching && (
        <div className="flex justify-center items-center flex-col gap-4 text-muted-foreground py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Analyzing link...</p>
        </div>
      )}

      {videoDetails && (
        <Card className="w-full shadow-lg animate-in fade-in-50 duration-500">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-6">
                <div className="w-full aspect-video">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoDetails.videoId}`}
                        title={videoDetails.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                        data-ai-hint="video embed"
                    ></iframe>
                </div>
                <div className="w-full space-y-4 text-center">
                    <h3 className="text-xl font-bold">{videoDetails.title}</h3>
                    <div className="flex justify-center">
                        <Button onClick={handleDownload} size="lg" disabled={isDownloading || !videoDetails.downloadUrl}>
                            {isDownloading ? (
                                <Loader2 className="mr-2 animate-spin" />
                            ) : (
                                <Download className="mr-2" />
                            )}
                            Download MP4
                        </Button>
                    </div>
                </div>
            </div>
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
