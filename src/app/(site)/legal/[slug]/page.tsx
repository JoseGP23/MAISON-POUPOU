import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageView } from "@/components/content/PageView";
import { legalPageIds, seedPages, type PageId } from "@/lib/content";

const isLegal = (slug: string): slug is (typeof legalPageIds)[number] => (legalPageIds as readonly string[]).includes(slug);

export function generateStaticParams() {
  return legalPageIds.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isLegal(slug)) return {};
  return { title: seedPages[slug].title, robots: { index: false } };
}

async function Legal({ params }: { params: PageProps<"/legal/[slug]">["params"] }) {
  const { slug } = await params;
  if (!isLegal(slug)) notFound();
  return <PageView id={slug as PageId} />;
}

export default function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[60svh]" />}>
      <Legal params={params} />
    </Suspense>
  );
}
