"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generateInstagramHashtags, GenerateInstagramHashtagsInput } from "@/ai/flows/generate-instagram-hashtags";

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
import { Badge } from "@/components/ui/badge";
import { Loader2, Copy, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  videoUrl: z.string().url({ message: "Please enter a valid YouTube URL." }),
});

export function HashtagGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: "",
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setHashtags([]);
    
    try {
      const input: GenerateInstagramHashtagsInput = { videoUrl: values.videoUrl };
      const result = await generateInstagramHashtags(input);
      const generatedHashtags = result.hashtags.split(',').map(h => h.trim()).filter(Boolean);
      setHashtags(generatedHashtags);
    } catch (error) {
      console.error("Error generating hashtags:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem generating your hashtags. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (hashtags.length === 0) return;
    const hashtagString = hashtags.join(' ');
    navigator.clipboard.writeText(hashtagString);
    toast({
      title: "Copied to clipboard!",
      description: "Hashtags are ready to be pasted.",
      className: "bg-accent text-accent-foreground border-green-300"
    });
  };

  return (
    <div className="space-y-8">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            <span>AI Hashtag Generator</span>
          </CardTitle>
          <CardDescription>
            Paste a YouTube video link to generate relevant Instagram hashtags.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col sm:flex-row items-start gap-2">
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="https://www.youtube.com/watch?v=..." {...field} className="text-base h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto h-12 text-base shrink-0">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || hashtags.length > 0) && (
        <Card className="w-full shadow-lg animate-in fade-in-50 duration-500">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Generated Hashtags</CardTitle>
              {hashtags.length > 0 && (
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary mr-4" />
                <p>Generating with AI...</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-base py-1 px-3 cursor-pointer hover:bg-accent/20 border-primary/50"
                    onClick={() => {
                      navigator.clipboard.writeText(tag);
                      toast({ title: `Copied "${tag}"` });
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
