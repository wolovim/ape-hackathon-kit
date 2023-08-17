'use client'

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { Billboard } from "@/app/components/Billboard";

export default function Home() {
  const { address: addr, isConnecting, isDisconnected } = useAccount()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <ConnectButton showBalance={false} />

      {addr ? (
        <div className="text-center">
          <Billboard />
        </div>
      ) : (
        <div className="text-center m-8">
          Connect a wallet to view the billboard!
        </div>
      )
      }
    </main>
  )
}
