import { PublicChrome } from "@/components/layout/PublicChrome";

// Marco público (header y footer) para todas las páginas del sitio.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <PublicChrome>{children}</PublicChrome>;
}
