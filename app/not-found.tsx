import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { TextLink } from "@/components/text-link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <PageHeader eyebrow="404" title="This page doesn't exist.">
        <p>The link may be outdated, or the address may have a typo.</p>
      </PageHeader>
      <p className="mt-10 text-sm">
        <TextLink href="/">Back to home</TextLink>
      </p>
    </>
  );
}
