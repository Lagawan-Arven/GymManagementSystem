import { Mail, MapPin, Send } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

export const ContactPage = () => {
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    // TODO: Wire up to backend or Formspree
    console.log("Message sent!");
  };

  return (
    <div className="bg-background min-h-screen py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get in touch
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Have a question about the enterprise plan or need help setting up?
            Drop a message.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="bg-muted/30 border-border space-y-8 rounded-2xl border p-8">
            <div>
              <h3 className="mb-6 text-xl font-semibold">
                Contact Information
              </h3>
              <div className="space-y-6">
                <a
                  href="mailto:arvenlagawan0731@gmail.com"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-4 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="text-[14px] md:text-[16px]">
                    arvenlagawan0731@gmail.com
                  </span>
                </a>
                <div className="text-muted-foreground flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span>Iligan City, Philippines</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="border-border mb-6 border-t pt-4 text-xl font-semibold">
                Connect Socially
              </h3>
              <div className="space-y-6">
                <a
                  href="https://x.com/ItsMeArven"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-4 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900">
                    <FaSquareXTwitter className="h-5 w-5" />
                  </div>
                  <span>@ItsMeArven</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/arven-lagawan"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-4 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A66C2] text-white">
                    <FaLinkedin className="h-5 w-5" />
                  </div>
                  <span>Arven Lagawan</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border-border rounded-2xl border p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@gym.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  className="min-h-37.5 resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 text-white hover:bg-red-700"
              >
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
