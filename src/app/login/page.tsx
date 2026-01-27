"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { StaticAuth } from "@/lib/static-auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = StaticAuth.login(email, password);

        if (result.success) {
            toast.success("Login successful");
            setTimeout(() => {
                router.push("/dashboard");
            }, 800);
        } else {
            toast.error(result.message || "Login failed");
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_15%_50%,rgba(139,92,246,0.08)_0%,transparent_25%),radial-gradient(circle_at_85%_30%,rgba(16,185,129,0.05)_0%,transparent_25%)]" />

            <Card className="z-10 w-full max-w-md border-zinc-800 bg-zinc-900/80 backdrop-blur-md shadow-2xl">
                <CardHeader className="space-y-1 text-center pb-8">
                    <div className="flex justify-center mb-6">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-700 shadow-[0_0_15px_rgba(139,92,246,0.3)]" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Sign in to access your dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-400 font-medium">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-zinc-700 bg-zinc-800/50 text-white placeholder:text-zinc-600 focus-visible:ring-purple-500 transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-zinc-400 font-medium">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-zinc-700 bg-zinc-800/50 text-white placeholder:text-zinc-600 focus-visible:ring-purple-500 transition-all"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-purple-600 text-white hover:bg-purple-700 font-semibold shadow-lg shadow-purple-500/20 mt-2"
                            disabled={loading}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center mt-2">
                    <div className="text-sm text-zinc-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-purple-400 hover:text-purple-300 hover:underline">
                            Sign Up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
