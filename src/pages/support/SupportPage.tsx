import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, MessageSquare, BookOpen } from "lucide-react";
import { toast } from "sonner";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

import { supportSchema, type SupportFormValues } from "../../lib/validation";
import { useAuth } from "../../context/useAuth";

const FAQS = [
  {
    question: "How do I upgrade my SaaS subscription?",
    answer:
      "Navigate to the 'SaaS Billing' page from the sidebar. Select your desired plan and click 'Subscribe Now'. You will be securely redirected to PayMongo to complete the transaction.",
  },
  {
    question: "What happens when a member's subscription expires?",
    answer:
      "Their status will automatically change to 'Expired' (highlighted in red) on the Members page. They will no longer be counted as an Active Member in your Dashboard metrics until a new payment is recorded.",
  },
  {
    question: "Can I add multiple staff accounts?",
    answer:
      "Yes! If you are on the Pro or Enterprise plan, you can add additional Admin accounts via the Settings page. Admins can record payments and add members, but cannot access your Billing page.",
  },
  {
    question: "How do I process a refund?",
    answer:
      "Currently, refunds must be handled manually outside of the system. Once you refund the member, you can delete the payment record from the 'Payments' ledger to keep your revenue charts accurate.",
  },
];

export const SupportPage = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      category: "General Inquiry",
    },
  });

  const onSubmit = (data: SupportFormValues) => {
    setIsSubmitting(true);

    // Simulate an API call to your backend (e.g., POST /api/v1/support/tickets)
    setTimeout(() => {
      console.log("Ticket Submitted:", {
        ...data,
        user_id: user?.id,
        gym_id: user?.gym_id,
      });
      toast.success("Message sent! Our support team will email you shortly.");
      reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Help & Support</h2>
        <p className="text-muted-foreground">
          Find answers to common questions or reach out to the ArvFit team.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        {/* LEFT SIDE: FAQs */}
        <div className="space-y-6">
          <Card className="border-none bg-transparent shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="flex items-center gap-2 text-xl">
                <BookOpen className="h-5 w-5 text-red-500" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Quick answers to the most common gym management queries.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card mb-2 rounded-lg border px-4"
                  >
                    <AccordionTrigger className="text-left font-medium hover:text-red-500 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE: Support Ticket Form */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-red-500" />
              Raise a Concern
            </CardTitle>
            <CardDescription>
              Can't find what you're looking for? Send us a message and we'll
              get back to you within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="category">Category</Label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Billing">
                          Billing & Subscriptions
                        </SelectItem>
                        <SelectItem value="Technical Issue">
                          Technical Issue / Bug
                        </SelectItem>
                        <SelectItem value="Feature Request">
                          Feature Request
                        </SelectItem>
                        <SelectItem value="General Inquiry">
                          General Inquiry
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief summary of your issue"
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="text-xs text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please provide as much detail as possible..."
                  className="min-h-30 resize-none"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-xs text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full bg-red-600 text-white hover:bg-red-700"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Submit Ticket
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
