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
            {/* Subtle Grid Background from Welcome Page */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <Card className="z-10 w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-md shadow-2xl">
                <CardHeader className="space-y-1 text-center pb-8">
                    <div className="flex justify-center mb-6">
                        <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-xl font-bold text-black shadow-lg shadow-white/10">
                            A
                        </div>
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
                                className="border-zinc-800 bg-black/50 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/20 transition-all"
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
                                className="border-zinc-800 bg-black/50 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/20 transition-all"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-white text-black hover:bg-zinc-200 font-medium shadow-lg shadow-white/5 mt-2 transition-all"
                            disabled={loading}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center mt-2">
                    <div className="text-sm text-zinc-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-white hover:text-zinc-300 hover:underline transition-colors">
                            Sign Up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
