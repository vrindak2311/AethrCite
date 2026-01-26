"use client";


import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Loader2, LogOut, Upload, User, CheckCircle, Copy, Trash2, History as HistoryIcon, FileText, Zap, Shield } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";

interface HistoryItem {
    id: number;
    date: string;
    score: number;
    preview: string;
}

export default function DashboardPage() {
    const router = useRouter();

    // Check authentication
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        } else {
            // Optional: Verify token with backend if needed, but user just asked for "before dashboard" check
            // For now, client side check is sufficient as per request flow
        }
    }, [router]);
    const [loading, setLoading] = useState(false);

    // Plagiarism Logic State
    const [code, setCode] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [result, setResult] = useState<{ score: number; aiCode: string } | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to results when they appear
    useEffect(() => {
        if (result && resultsRef.current) {
            // Small delay to ensure DOM is fully rendered/animated
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [result]);

    // Load history from localStorage on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem('aethrcite_history');
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    const saveHistory = (newHistory: HistoryItem[]) => {
        setHistory(newHistory);
        localStorage.setItem('aethrcite_history', JSON.stringify(newHistory));
    };

    const handleExit = () => {
        router.push("/");
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            if (typeof event.target?.result === 'string') {
                setCode(event.target.result);
                toast.success(`Loaded content from ${file.name}`);
            }
        };

        // Mock PDF/Image handling as per original logic
        if (file.type === "application/pdf" || file.type.startsWith("image/")) {
            setCode(`// Simulated file content for: ${file.name}\nfunction example() {\n    console.log("This is a simulation of file parsing.");\n}`);
            toast.info("Simulated parsing for binary file");
        } else {
            reader.readAsText(file);
        }
    };

    const runCheck = () => {
        if (!code.trim()) {
            toast.error("Please enter some code first.");
            return;
        }

        setIsChecking(true);
        // Simulate API delay
        setTimeout(() => {
            const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'return', 'class'];
            let matchedCount = 0;
            keywords.forEach(kw => {
                if (code.toLowerCase().includes(kw)) matchedCount++;
            });

            const rawScore = Math.floor(Math.random() * 40) + (matchedCount * 5);
            const finalScore = Math.min(rawScore, 100);

            const aiSuggestion = `// AI SUGGESTED UNIQUE VERSION\n// Optimized for 0% plagiarism\n\n${code.split('\n').map(line => line.startsWith('//') ? line : `/* Unique */ ${line.trim()}`).join('\n')}`;

            setResult({ score: finalScore, aiCode: aiSuggestion });

            // Add to history
            const newItem: HistoryItem = {
                id: Date.now(),
                date: new Date().toLocaleString(),
                score: finalScore,
                preview: code.substring(0, 60) + (code.length > 60 ? '...' : '')
            };
            saveHistory([newItem, ...history]);

            setIsChecking(false);
            toast.success("Analysis complete!");
        }, 1500);
    };

    const copyToClipboard = () => {
        if (result?.aiCode) {
            navigator.clipboard.writeText(result.aiCode);
            toast.success("AI Code copied to clipboard!");
        }
    };

    const clearHistory = () => {
        if (confirm('Clear all history?')) {
            saveHistory([]);
            toast.success("History cleared");
        }
    };



    return (
        <div className="min-h-screen bg-zinc-950 p-6 text-zinc-100 font-sans selection:bg-white/20 relative overflow-hidden">
            {/* Subtle Grid Background from Welcome Page */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="mx-auto max-w-7xl space-y-8 relative z-10">
                {/* Header */}
                <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                            <span className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-sm text-black shadow-lg shadow-white/10 font-bold">A</span>
                            AethrCite Dashboard
                        </h1>
                        <p className="text-zinc-400 mt-1 pl-1">Write code own it.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="default" // or ghost/outline
                            className="bg-white hover:bg-zinc-200 text-black shadow-lg shadow-white/5 transition-all"
                            onClick={() => router.push("/history")}
                        >
                            <HistoryIcon className="mr-2 h-4 w-4" />
                            History
                        </Button>
                        <Button
                            variant="secondary"
                            className="bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
                            onClick={handleExit}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            To Home
                        </Button>
                    </div>
                </header>

                <div className="grid gap-8 lg:grid-cols-1">
                    {/* Main Code & Results Area (Full Width) */}
                    <div className="space-y-8">
                        {/* Input Card */}
                        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm shadow-xl flex flex-col">
                            <CardHeader className="border-b border-zinc-800/50 pb-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <CardTitle className="flex items-center gap-2 text-white">
                                            <FileText className="h-5 w-5 text-white" />
                                            Input Source Code
                                        </CardTitle>
                                        <CardDescription className="text-zinc-400">
                                            Analyze text or upload a file to detect AI-generated or plagiarized content.
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-zinc-500 font-mono mr-2 hidden md:inline-block">
                                            {code.length} chars
                                        </span>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept=".txt,.js,.py,.html,.css,.pdf,.png,.jpg"
                                            onChange={handleFileUpload}
                                        />
                                        <Button variant="outline" size="sm" className="border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 hover:text-white h-9" onClick={() => fileInputRef.current?.click()}>
                                            <Upload className="mr-2 h-3.5 w-3.5" />
                                            Upload
                                        </Button>
                                        <Button
                                            className="bg-white hover:bg-zinc-200 text-black font-medium h-9 px-4 text-sm transition-all shadow-lg shadow-white/10"
                                            onClick={runCheck}
                                            disabled={isChecking}
                                        >
                                            {isChecking ? (
                                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                            ) : (
                                                <>
                                                    <CheckCircle className="mr-2 h-3.5 w-3.5" />
                                                    Check Code
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Textarea
                                    className="min-h-[400px] w-full resize-y rounded-none border-0 bg-black/60 p-6 font-mono text-sm text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0 leading-relaxed"
                                    placeholder="// Paste your code here..."
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    style={{ color: '#f4f4f5' }}
                                />
                            </CardContent>
                            {/* Footer removed to save space */}
                        </Card>

                        {/* Results Section */}
                        {result && (
                            <div
                                ref={resultsRef}
                                className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-6 duration-700"
                            >
                                {/* Score Card */}
                                <Card className="border-zinc-800 bg-zinc-900/50 overflow-hidden relative group hover:border-zinc-700 transition-colors">
                                    <div className={`absolute top-0 left-0 w-full h-1 ${result.score > 50 ? 'bg-red-500' : 'bg-green-500'} shadow-[0_0_20px_rgba(0,0,0,0.5)]`} />
                                    <CardHeader>
                                        <CardTitle className="text-white flex items-center gap-2">
                                            <Zap className="h-5 w-5 text-yellow-500" />
                                            Plagiarism Score
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-center justify-center py-6">
                                        <div className="relative flex items-center justify-center h-48 w-48 rounded-full bg-zinc-800 shadow-2xl">
                                            <div className="absolute inset-0 rounded-full"
                                                style={{
                                                    background: `conic-gradient(${result.score > 50 ? '#ef4444' : '#22c55e'} ${result.score * 3.6}deg, transparent 0deg)`,
                                                    mask: 'radial-gradient(transparent 60%, black 61%)',
                                                    WebkitMask: 'radial-gradient(transparent 60%, black 61%)'
                                                }}
                                            />
                                            <div className="flex flex-col items-center">
                                                <span className={`text-5xl font-bold tracking-tighter ${result.score > 50 ? 'text-red-500' : 'text-green-500'}`}>
                                                    {result.score}%
                                                </span>
                                                <span className="text-xs uppercase tracking-widest text-zinc-500 mt-1">Matched</span>
                                            </div>
                                        </div>
                                        <p className="mt-6 text-zinc-400 text-center max-w-xs">{
                                            result.score > 50
                                                ? "High similarity detected. Consider rewriting the highlighted sections."
                                                : "Great job! Your content appears to be original."
                                        }</p>
                                    </CardContent>
                                </Card>

                                {/* AI Recommendation Card */}
                                <Card className="border-zinc-800 bg-zinc-900/50 flex flex-col h-full hover:border-zinc-700 transition-colors">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-white text-lg flex items-center gap-2">
                                            <div className="h-6 w-6 rounded bg-white/10 flex items-center justify-center text-white">
                                                <Shield className="h-4 w-4" />
                                            </div>
                                            AI Rewritten Version
                                        </CardTitle>
                                        <Button size="sm" variant="ghost" className="h-8 text-zinc-400 hover:text-white hover:bg-white/5" onClick={copyToClipboard}>
                                            <Copy className="mr-2 h-4 w-4" />
                                            Copy
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="flex-1 min-h-[250px] relative">
                                        <div className="absolute inset-0 p-4 pt-0">
                                            <div className="h-full w-full bg-black/50 rounded-lg border border-zinc-800 overflow-auto p-4 custom-scrollbar">
                                                <pre className="text-sm font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed">
                                                    {result.aiCode}
                                                </pre>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

