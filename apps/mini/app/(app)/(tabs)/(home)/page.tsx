"use client";

import Image from "next/image";
import Link from "next/link";
import { Wallet } from "@coinbase/onchainkit/wallet";

import { Button } from "@myapp/ui/components/button";

import { useAuth } from "@/app/_contexts/auth-context";

import styles from "./page.module.css";

export default function Home() {
  const { signIn, error } = useAuth();

  return (
    <div className={styles.container}>
      <header className={styles.headerWrapper}>
        <Wallet />
      </header>

      <div className={styles.content}>
        <Image
          priority
          src="/sphere.svg"
          alt="Sphere"
          width={200}
          height={200}
        />
        <h1 className={`${styles.title} font-accent`}>MiniKit</h1>

        <p>
          Start by editing <code>app/page.tsx</code>
        </p>
        <Button onClick={signIn}>Sign In</Button>
        {error && <p className={styles.error}>Error: {error.message}</p>}

        <h2 className={styles.componentsTitle}>Explore Components</h2>

        <Link href="/settings">Settings</Link>
        <Link href="/profile">Profile</Link>
      </div>
    </div>
  );
}
