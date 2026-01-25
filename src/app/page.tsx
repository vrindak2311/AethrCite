"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/index.html";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white font-sans">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to AethrCite...</h1>
        <p className="text-zinc-400">If you are not redirected, <a href="/index.html" className="text-purple-500 underline">click here</a>.</p>
      </div>
    </div>
  );
}
