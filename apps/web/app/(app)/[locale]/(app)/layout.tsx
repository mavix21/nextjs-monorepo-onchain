import {
  ConvexClientProvider,
  OnchainKitClientProvider,
} from "../../_providers";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>
      <OnchainKitClientProvider>{children}</OnchainKitClientProvider>
    </ConvexClientProvider>
  );
}
