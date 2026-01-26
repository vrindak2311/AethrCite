export default function TermsPage() {
    return (
        <div className="min-h-screen bg-zinc-950 pt-32 pb-12 px-6 text-zinc-300">
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
                    <p>By accessing and using AethrCite, you accept and agree to be bound by the terms and provision of this agreement.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">2. Use License</h2>
                    <p>Permission is granted to temporarily download one copy of the materials (information or software) on AethrCite's website for personal, non-commercial transitory viewing only.</p>
                </section>
            </div>
        </div>
    );
}
