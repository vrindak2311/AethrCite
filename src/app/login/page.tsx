"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAuth = async (action: 'signup' | 'login') => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch(`/api/${action}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem("token", data.token);
                toast.success(`${action === 'signup' ? 'Signup' : 'Login'} successful`);

                // Redirect to dashboard
                // Small delay to let toast show
                setTimeout(() => {
                    router.push("/dashboard");
                }, 500);
            } else {
                setError(data.message || "Something went wrong");
                toast.error(data.message || `${action} failed`);
            }
        } catch (err) {
            setError("Network error");
            toast.error("Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 pt-20 pb-20">
            {/* Background elements to match theme */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <Card className="z-10 w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-sm shadow-xl">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">AethrCite</span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Welcome</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Login or Signup to access your dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-200">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-zinc-700 bg-zinc-950/50 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-zinc-200">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-zinc-700 bg-zinc-950/50 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-600"
                        />
                    </div>
                    {error && <p className="text-sm text-red-500 font-medium text-center">{error}</p>}
                </CardContent>
                <CardFooter className="flex gap-3">
                    <Button
                        variant="default"
                        className="flex-1 bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
                        onClick={() => handleAuth('signup')}
                        disabled={loading}
                    >
                        Signup
                    </Button>
                    <Button
                        className="flex-1 bg-white text-zinc-950 hover:bg-zinc-200"
                        onClick={() => handleAuth('login')}
                        disabled={loading}
                    >
                        {loading ? "..." : "Login"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
