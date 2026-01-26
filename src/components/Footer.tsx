import Link from "next/link";
import { Mail, Shield, Scale, ArrowUpRight } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-zinc-950 pt-10 pb-8 overflow-hidden font-sans border-t border-white/5">
            {/* Decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-50" />

            {/* Subtle background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">

                    {/* Brand Column */}
                    <div className="md:col-span-5 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                                A
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">AethrCite</span>
                        </div>
                        <p className="text-zinc-400 leading-relaxed max-w-sm font-medium">
                            AethrCite is the advanced standard for code integrity. We provide state-of-the-art plagiarism detection and AI code analysis to ensure authenticity in the modern educational and professional ecosystem.
                        </p>
                    </div>

                    {/* Legal Links */}
                    <div className="md:col-span-3 space-y-6">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/privacy" className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                                    <Shield className="h-4 w-4 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                                    <span>Privacy Policy</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                                    <Scale className="h-4 w-4 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                                    <span>Terms of Service</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Contacts */}
                    <div className="md:col-span-4 space-y-6">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Official Support</h3>
                        <div className="space-y-3">
                            {[
                                "anuragjadon0317@gmail.com",
                                "anisharanjan7777@gmail.com",
                                "vrindakhandelwal006@gmail.com"
                            ].map((email) => (
                                <a
                                    key={email}
                                    href={`mailto:${email}`}
                                    className="group flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-indigo-500/30 hover:bg-zinc-900 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                                            <Mail className="h-4 w-4 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                                        </div>
                                        <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{email}</span>
                                    </div>
                                    <ArrowUpRight className="h-3 w-3 text-zinc-600 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
                    <p>© {currentYear} AethrCite Inc. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse"></span>
                        <span>All Systems Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
