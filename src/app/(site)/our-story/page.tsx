import type { Metadata } from "next";
import { PageView } from "@/components/content/PageView";
import { seedPages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nuestra historia",
  description: seedPages["our-story"].intro,
};

export default function OurStoryPage() {
  return <PageView id="our-story" />;
}
