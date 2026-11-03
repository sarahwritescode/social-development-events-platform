
"use client";

import { useState } from "react";
import { getJwtToken } from "@/lib/auth-client";

export default function TestAuthPage() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testAuthentication = async () => {
    try {
      setLoading(true);
      setResult("");

      const token = await getJwtToken();

      const response = await fetch(
        "http://localhost:5000/api/test-auth",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">JWT Authentication Test</h1>

      <button
        onClick={testAuthentication}
        disabled={loading}
        className="rounded-lg bg-green-700 px-6 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Testing..." : "Test JWT Authentication"}
      </button>

      {result && (
        <pre className="max-w-full overflow-auto rounded-lg bg-gray-100 p-5 text-sm text-black">
          {result}
        </pre>
      )}
    </main>
  );
}
