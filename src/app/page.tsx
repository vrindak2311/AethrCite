"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap, Shield, Globe, Search, Code, Lock } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white selection:bg-white/20">

      {/* Refined Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/50">
        <div className="container mx-auto flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">AethrCite</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/login">
              <Button size="sm" className="bg-white text-zinc-950 hover:bg-zinc-200 font-medium h-8 px-4">
                SignIn
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-36 md:pb-20 overflow-hidden">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          <div className="container relative z-10 mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="mx-auto max-w-4xl text-5xl font-semibold tracking-tighter text-white md:text-7xl lg:text-8xl mb-6">
                Originality, <span className="text-zinc-500">Verified.</span>
              </h1>

              <p className="mx-auto max-w-xl text-lg text-zinc-400 md:text-xl leading-relaxed mb-10">
                The standard for code integrity. Detect plagiarism, AI generation, and ensure academic honesty with a single click.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/dashboard">
                  <Button size="lg" className="h-12 bg-white text-black px-8 text-base font-medium hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    Start Checking Now
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" className="h-12 bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 px-8 text-base font-medium shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    How it Works
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>


        {/* Bento Grid Features */}
        <section id="features" className="py-16 md:py-24 mb-8">
          <div className="container mx-auto px-6">
            <div className="mb-16 md:text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">Precision Engineered</h2>
              <p className="text-zinc-400">Deep analysis for text and code identifiers that simpler tools miss.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2 h-auto md:h-[480px]">
              {/* Large Feature */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 md:p-10 flex flex-col justify-between group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center mb-6">
                    <Search className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Deep Code Analysis</h3>
                  <p className="text-zinc-400 max-w-md">Our engine parses ASTs (Abstract Syntax Trees) to detect logic similarity, not just variable name matching. It finds copied code even if variables are renamed.</p>
                </div>

                {/* Visual Abstract Representation */}
                <div className="mt-8 relative h-48 w-full rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-xs text-zinc-500 overflow-hidden">
                  <div className="absolute top-0 right-0 p-2">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-red-500/50" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                      <div className="h-2 w-2 rounded-full bg-green-500/50" />
                    </div>
                  </div>
                  <p><span className="text-pink-400">function</span> <span className="text-blue-400">analyze</span>(code) {'{'}</p>
                  <p className="pl-4">const <span className="text-yellow-200">entropy</span> = calculate(code);</p>
                  <p className="pl-4">if (entropy &lt; THRESHOLD) {'{'}</p>
                  <p className="pl-8 text-green-400">// Suspicious pattern detected</p>
                  <p className="pl-8">return <span className="text-purple-400">FLAG_AI_GENERATED</span>;</p>
                  <p className="pl-4">{'}'}</p>
                  <p>{'}'}</p>
                </div>
              </motion.div>

              {/* Small Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-3xl border border-white/10 bg-zinc-900/50 p-6 group hover:border-white/20 transition-colors"
              >
                <Lock className="h-8 w-8 text-zinc-400 mb-4 group-hover:text-white transition-colors" />
                <h3 className="text-lg font-semibold text-white mb-2">Privacy First</h3>
                <p className="text-sm text-zinc-400">Code is processed in-memory and never stored for training.</p>
              </motion.div>

              {/* Small Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative rounded-3xl border border-white/10 bg-zinc-900/50 p-6 group hover:border-white/20 transition-colors"
              >
                <Zap className="h-8 w-8 text-zinc-400 mb-4 group-hover:text-white transition-colors" />
                <h3 className="text-lg font-semibold text-white mb-2">Real-time Results</h3>
                <p className="text-sm text-zinc-400">Get plagiarism scores and detailed reports in milliseconds.</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
