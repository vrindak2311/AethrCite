"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Trash2, FileText, Calendar, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface HistoryItem {
    id: number;
    date: string;
    score: number;
    preview: string;
}

export default function HistoryPage() {
    const [history, setHistory] = useState<HistoryItem[]>([]);

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

    const clearHistory = () => {
        if (confirm('Are you sure you want to clear all history?')) {
            localStorage.setItem('aethrcite_history', JSON.stringify([]));
            setHistory([]);
            toast.success("History cleared");
        }
    };

    const deleteItem = (id: number) => {
        const newHistory = history.filter(item => item.id !== id);
        setHistory(newHistory);
        localStorage.setItem('aethrcite_history', JSON.stringify(newHistory));
        toast.success("Item deleted");
    };

    return (
        <div className="min-h-screen bg-zinc-950 p-6 text-zinc-100 font-sans selection:bg-indigo-500/30">
            <div className="mx-auto max-w-5xl space-y-8">
                {/* Header */}
                <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-800 pb-6">
                    <div>
                        <Link href="/dashboard" className="inline-flex items-center text-sm text-zinc-400 hover:text-white mb-2 transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                            Check History
                        </h1>
                        <p className="text-zinc-400 mt-1">Review your past plagiarism checks.</p>
                    </div>
                    {history.length > 0 && (
                        <Button
                            variant="destructive"
                            className="bg-red-950/50 text-red-400 hover:bg-red-900/50 border border-red-900/50"
                            onClick={clearHistory}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Clear All History
                        </Button>
                    )}
                </header>

                {/* History List */}
                <div className="space-y-4">
                    {history.length === 0 ? (
                        <Card className="border-zinc-800 bg-zinc-900/50 py-16">
                            <CardContent className="flex flex-col items-center justify-center text-center">
                                <div className="h-16 w-16 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4">
                                    <FileText className="h-8 w-8 text-zinc-600" />
                                </div>
                                <h3 className="text-xl font-medium text-white mb-2">No history found</h3>
                                <p className="text-zinc-400 max-w-md mb-6">
                                    You haven't run any plagiarism checks yet. Go back to the dashboard to scan your code.
                                </p>
                                <Link href="/dashboard">
                                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                        Go to Dashboard
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4">
                            {history.map((item) => (
                                <Card key={item.id} className="border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors group">
                                    <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-start justify-between">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className={`text-sm font-bold px-3 py-1 rounded-full border ${item.score > 50
                                                    ? 'bg-red-950/30 text-red-500 border-red-900/30'
                                                    : 'bg-green-950/30 text-green-500 border-green-900/30'
                                                    }`}>
                                                    {item.score}% Match
                                                </span>
                                                <span className="flex items-center text-xs text-zinc-500">
                                                    <Calendar className="h-3 w-3 mr-1" />
                                                    {item.date}
                                                </span>
                                            </div>
                                            <p className="font-mono text-sm text-zinc-300 line-clamp-2 bg-black/40 p-3 rounded border border-zinc-800/50">
                                                {item.preview}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 self-end md:self-start md:mt-1">
                                            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-red-400 hover:bg-red-950/20" onClick={() => deleteItem(item.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
