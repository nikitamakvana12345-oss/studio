import { HashtagGenerator } from "@/components/hashtag-generator";

export default function HashtagGeneratorPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
          Hashtag Generator
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Generate relevant and trending Instagram hashtags for your YouTube videos using the power of AI.
        </p>
      </div>
      <HashtagGenerator />

      <div className="mt-8 flex justify-center">
        <div className="w-full h-24 bg-muted/50 border border-dashed rounded-lg flex items-center justify-center text-muted-foreground">
          AdSense Ad Slot
        </div>
      </div>
    </div>
  );
}
