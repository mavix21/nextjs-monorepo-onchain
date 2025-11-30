import { ConvexClientProvider } from "../../_providers/convex-cllient.provider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}
