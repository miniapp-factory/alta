"use client";

import { useEffect, useState } from "react";
import { Connection, PublicKey, type ParsedAccountInfo } from "@solana/web3.js";

export default function AltcoinAnalyzer() {
  const [tokens, setTokens] = useState<ParsedAccountInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTokens() {
      const connection = new Connection(
        process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
          "https://api.mainnet-beta.solana.com"
      );
      const programId = new PublicKey(
        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
      ); // SPL Token program
      try {
        const accounts = await connection.getParsedTokenAccountsByOwner(
          programId,
          { programId }
        );
        setTokens(accounts.value);
      } catch (e) {
        console.error("Failed to fetch tokens", e);
      } finally {
        setLoading(false);
      }
    }
    fetchTokens();
  }, []);

  if (loading) return <p>Loading alt‑coins...</p>;

  return (
    <section className="w-full max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Solana Alt‑Coins</h2>
      <ul className="space-y-2">
        {tokens.map((acc, idx) => (
          <li key={idx} className="p-2 border rounded">
            {JSON.stringify(acc.account.data.parsed.info)}
          </li>
        ))}
      </ul>
    </section>
  );
}
