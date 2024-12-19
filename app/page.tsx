import SearchSection from "@/components/SearchSection";
import { Newspaper } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Newspaper className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Research Hub</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore any topic with our intelligent research assistant. Get comprehensive information and relevant images instantly.
          </p>
        </div>
        <SearchSection />
      </div>
    </main>
  );
}
