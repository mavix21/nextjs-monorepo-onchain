"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Address, Avatar, Identity, Name } from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useConvexAuth } from "convex/react";
import { useAccount, useChainId } from "wagmi";

import { Badge } from "@myapp/ui/components/badge";
import { Button } from "@myapp/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@myapp/ui/components/card";
import { Separator } from "@myapp/ui/components/separator";

import { authClient } from "@/auth/client";

function InfoRow({
  label,
  value,
  isAccent = false,
}: {
  label: string;
  value: React.ReactNode;
  isAccent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-muted-foreground text-xs tracking-wide uppercase">
        {label}
      </span>
      <span
        className={`text-sm break-all ${isAccent ? "font-accent text-xs" : ""}`}
      >
        {value ?? <span className="text-muted-foreground italic">N/A</span>}
      </span>
    </div>
  );
}

export default function ProtectedPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
  const { data: session } = authClient.useSession();
  const { address, isConnected, isConnecting, connector } = useAccount();
  const chainId = useChainId();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const loading = isAuthLoading || isConnecting;
  const user = session?.user;

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-muted-foreground animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl space-y-6 p-4">
      <div className="space-y-2">
        <h1 className="font-accent text-2xl font-bold">Auth Playground</h1>
        <p className="text-muted-foreground">
          This page displays your authentication details and session data.
        </p>
        <Link href="/test">to test page</Link>
      </div>

      {/* Auth Status */}
      <Card>
        <CardHeader>
          <CardTitle className="font-accent flex items-center gap-2">
            Authentication Status
            <Badge variant={isAuthenticated ? "default" : "secondary"}>
              {isAuthenticated ? "Authenticated" : "Not Authenticated"}
            </Badge>
          </CardTitle>
          <CardDescription>Your current authentication state</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-end">
            <Button
              variant="secondary"
              onClick={async () => {
                try {
                  setIsSigningOut(true);
                  await authClient.signOut();
                  // notify store so session hooks update
                  authClient.$store.notify("$sessionSignal");
                } catch (e) {
                  console.error("Sign out failed", e);
                } finally {
                  setIsSigningOut(false);
                }
              }}
              disabled={!isAuthenticated || isSigningOut}
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User Info */}
      {user && (
        <Card>
          <CardHeader>
            <CardTitle className="font-accent">User Profile</CardTitle>
            <CardDescription>
              Information from your authenticated session
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow label="User ID" value={user.id} isAccent />
              <InfoRow label="Name" value={user.name} />
              <InfoRow label="Email" value={user.email} />
              <InfoRow
                label="Email Verified"
                value={user.emailVerified ? "Yes" : "No"}
              />
            </div>
            {user.image && (
              <>
                <Separator />
                <InfoRow
                  label="Avatar"
                  value={
                    <Image
                      src={user.image}
                      alt="User avatar"
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  }
                />
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Session Info */}
      {session?.session && (
        <Card>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
            <CardDescription>
              Technical details about your current session
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow label="Session ID" value={session.session.id} isAccent />
              <InfoRow
                label="User ID"
                value={session.session.userId}
                isAccent
              />
              <InfoRow label="Token" value={session.session.token} isAccent />
              <InfoRow
                label="Created At"
                value={new Date(session.session.createdAt).toLocaleString()}
              />
              <InfoRow
                label="Updated At"
                value={new Date(session.session.updatedAt).toLocaleString()}
              />
              <InfoRow
                label="Expires At"
                value={new Date(session.session.expiresAt).toLocaleString()}
              />
            </div>
            {(session.session.ipAddress ?? session.session.userAgent) && (
              <>
                <Separator />
                <div className="grid gap-4">
                  <InfoRow
                    label="IP Address"
                    value={session.session.ipAddress}
                    isAccent
                  />
                  <InfoRow
                    label="User Agent"
                    value={session.session.userAgent}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Wallet Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Wallet Connection
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </CardTitle>
          <CardDescription>Your connected wallet details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoRow label="Address" value={address} isAccent />
            <InfoRow label="Chain ID" value={chainId} />
            <InfoRow label="Connector" value={connector?.name} />
          </div>
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-6 w-6" />
              <Name />
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address className="text-muted-foreground" />
              </Identity>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </CardContent>
      </Card>

      {/* Raw Session Data */}
      <Card>
        <CardHeader>
          <CardTitle>Raw Session Data</CardTitle>
          <CardDescription>
            Complete session object for debugging
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted overflow-auto rounded-lg p-4 text-xs">
            {JSON.stringify(session, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
