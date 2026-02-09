"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useSettings } from "@/context/settings-context";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactForm() {
  const { primaryColor, accentColor } = useSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const res = await fetch("/api/sendContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setIsSuccess(true);
        form.reset();
      } else {
        console.error("Email failed to send.");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }

    setIsSubmitting(false);
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  {...field}
                  className="bg-black/50 transition-all duration-300"
                  style={{
                    borderColor: `${primaryColor}20`,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${primaryColor}20`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = `${primaryColor}20`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="your.email@example.com"
                  type="email"
                  {...field}
                  className="bg-black/50 transition-all duration-300"
                  style={{
                    borderColor: `${primaryColor}20`,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${primaryColor}20`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = `${primaryColor}20`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="What is this regarding?"
                  {...field}
                  className="bg-black/50 transition-all duration-300"
                  style={{
                    borderColor: `${primaryColor}20`,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${primaryColor}20`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = `${primaryColor}20`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message..."
                  {...field}
                  className="bg-black/50 transition-all duration-300 min-h-[120px]"
                  style={{
                    borderColor: `${primaryColor}20`,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${primaryColor}20`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = `${primaryColor}20`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isSuccess && (
          <div
            className="p-3 rounded-md border backdrop-blur-md"
            style={{
              backgroundColor: `${primaryColor}10`,
              borderColor: `${primaryColor}30`,
              color: primaryColor
            }}
          >
            <p className="text-sm font-medium">Message sent successfully!</p>
            <p className="text-xs mt-1 opacity-80">
              Thank you for reaching out. I&apos;ll get back to you soon.
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-white transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            backgroundImage: `linear-gradient(to right, ${primaryColor}, ${accentColor})`,
            boxShadow: `0 4px 15px ${primaryColor}40`
          }}
        >
          {isSubmitting ? (
            <>Sending...</>
          ) : (
            <>
              Send Message <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
