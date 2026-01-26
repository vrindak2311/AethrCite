export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-zinc-950 pt-32 pb-12 px-6 text-zinc-300">
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
                    <p>Welcome to AethrCite. We respect your privacy and are committed to protecting your personal data.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">2. Data Collection</h2>
                    <p>We do not store your code permanently. Code submitted for analysis is processed in-memory and discarded after the session.</p>
                </section>
            </div>
        </div>
    );
}
