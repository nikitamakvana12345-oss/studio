import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
          About Us
        </h1>
        <p className="text-lg text-muted-foreground">
          Welcome to Media Bitesz, your one-stop solution for downloading YouTube videos and converting them to your desired format.
        </p>
        <p className="text-lg text-muted-foreground">
          Our mission is to provide a fast, reliable, and user-friendly service that makes it easy for you to get your favorite video content offline. Whether you're a content creator, an educator, or just someone who wants to watch videos without an internet connection, Media Bitesz is here to help.
        </p>
        <p className="text-lg text-muted-foreground">
          We are constantly working to improve our service and add new features. Thank you for choosing Media Bitesz!
        </p>
        
        <div className="pt-8 text-center">
            <h2 className="text-3xl font-bold text-primary tracking-tight">
                Sponsorship & Contact
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Interested in sponsoring our platform or have a business inquiry? We'd love to hear from you.
            </p>
            <div className="mt-6">
                <Button asChild size="lg">
                    <a href="mailto:santoshmakvana07@gmail.com">
                        <Mail className="mr-2" /> Contact Us
                    </a>
                </Button>
            </div>
        </div>

        <div className="my-8 flex justify-center">
          <div className="w-full h-24 bg-muted/50 border border-dashed rounded-lg flex items-center justify-center text-muted-foreground">
            AdSense Ad Slot
          </div>
        </div>
      </div>
    </div>
  );
}
