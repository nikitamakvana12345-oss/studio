import { Downloader } from "@/components/downloader";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Download, Zap } from "lucide-react";

const features = [
  {
    icon: <Download className="w-8 h-8 text-primary" />,
    title: "High-Speed Downloads",
    description: "Our service is optimized for speed, allowing you to download videos quickly without long waiting times."
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: "Easy to Use",
    description: "With a simple and intuitive interface, you can download videos with just a few clicks. No technical skills required."
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "High-Quality Video",
    description: "Download videos in the best available quality. Enjoy crisp and clear playback on any device."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Secure and Private",
    description: "Your privacy is our priority. We don't store your download history or personal information."
  }
];

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Downloader />

      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Our Features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to download your favorite videos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="my-8 flex justify-center">
        <div className="w-full h-24 bg-muted/50 border border-dashed rounded-lg flex items-center justify-center text-muted-foreground">
          AdSense Ad Slot
        </div>
      </div>

      <section className="py-16">
        <div className="text-center mb-12">
           <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions? We have answers.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">How do I use the downloader?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              It's simple! Just copy the URL of the YouTube video you want to download, paste it into the input box on our homepage, and click the "Fetch Video" button. Your video will be ready to download in moments.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg">What is your policy on Google Ads?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              We use Google AdSense to support our platform and keep our services free. All ads are displayed in accordance with Google's policies to ensure a safe and non-intrusive experience for our users. We strive to place ads in a way that does not interfere with the functionality of our site.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg">Is it legal to download YouTube videos?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Downloading videos from YouTube is against their terms of service. You should only download videos if you have permission from the copyright holder or if the video is in the public domain. Please respect copyright laws.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg">What video formats and qualities can I download?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              You can download videos in MP4 format. We provide the highest quality available from the source video, up to 1080p. We are working on supporting more formats and qualities in the future.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg">Can I download age-restricted videos?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Currently, our service does not support downloading age-restricted content from YouTube. You must be signed in to YouTube to view such content, and our downloader cannot bypass this restriction.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg">Are there any limits on the number of downloads?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              There are no strict limits on the number of videos you can download. However, we ask that you use the service fairly. Excessive use may be throttled to ensure a stable experience for all users.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-lg">Do I need to install any software?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              No, Media Bitesz is a fully web-based tool. You do not need to install any browser extensions or software on your device. Everything works directly in your web browser.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger className="text-lg">Why is the download speed slow sometimes?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Download speed can be affected by several factors, including your internet connection, the size of the video, and the current load on our servers. We strive to provide the fastest speeds possible.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-9">
            <AccordionTrigger className="text-lg">Can I download entire playlists or channels?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Currently, we only support downloading individual videos. We are exploring the possibility of adding support for downloading entire playlists or channels in a future update.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-10">
            <AccordionTrigger className="text-lg">What happens if a video has no sound?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Some YouTube videos, especially at higher qualities like 1080p and above, store their audio and video streams separately. Our service automatically merges them for you. If a downloaded video has no sound, it might be an issue with the source video itself.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-11">
            <AccordionTrigger className="text-lg">How do you handle my privacy?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              We take your privacy very seriously. We do not store any of the videos you download or your download history. All processes are anonymous. For more details, please read our Privacy Policy.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <div className="my-8 flex justify-center">
        <div className="w-full md:w-[300px] h-[250px] bg-muted/50 border border-dashed rounded-lg flex items-center justify-center text-muted-foreground">
          Medium Ad Slot
        </div>
      </div>
    </div>
  );
}
