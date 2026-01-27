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

export default function SignupPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setLoading(true);

        const result = StaticAuth.signup(username, email, password);

        if (result.success) {
            toast.success("Account created successfully");
            setTimeout(() => {
                router.push("/login");
            }, 1000);
        } else {
            toast.error(result.message || "Signup failed");
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
                    <CardTitle className="text-2xl font-bold text-white">Join AethrCite</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Create your professional account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-zinc-400 font-medium">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="johndoe"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border-zinc-800 bg-black/50 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/20 transition-all"
                                required
                            />
                        </div>
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
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-zinc-400 font-medium">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="border-zinc-800 bg-black/50 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/20 transition-all"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-white text-black hover:bg-zinc-200 font-medium shadow-lg shadow-white/5 mt-2 transition-all"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center mt-2">
                    <div className="text-sm text-zinc-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-white hover:text-zinc-300 hover:underline transition-colors">
                            Log In
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
