"use client";
    
    import { useState } from "react";
    import { Search, Loader2 } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Card } from "@/components/ui/card";
    import ResearchResults from "./ResearchResults";
    import { searchTopic } from "@/lib/api/search";
    import type { ResearchResults as ResultsType } from "@/lib/types";
    import { useToast } from "@/hooks/use-toast";
    
    export default function SearchSection() {
      const [query, setQuery] = useState("");
      const [isLoading, setIsLoading] = useState(false);
      const [results, setResults] = useState<ResultsType | null>(null);
      const [error, setError] = useState<string | null>(null);
      const { toast } = useToast();
    
      const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const searchQuery = query.trim();
        
        if (!searchQuery) {
          toast({
            title: "Error",
            description: "Please enter a search term",
            variant: "destructive",
          });
          return;
        }
    
        setIsLoading(true);
        setError(null);
        setResults(null);
        
        try {
          const data = await searchTopic(searchQuery);
          setResults(data);
        } catch (error) {
          console.error("Search failed:", error);
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to fetch research data. Please try a different search term.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };
    
      const handleTopicClick = (topic: string) => {
        setQuery(topic);
        handleSearch(new Event('submit') as any);
      };
    
      return (
        <div className="max-w-4xl mx-auto">
          <Card className="p-6">
            <form onSubmit={handleSearch} className="flex gap-4 mb-8">
              <Input
                placeholder="Enter a topic to research..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Research
              </Button>
            </form>
            {results && <ResearchResults results={results} onTopicClick={handleTopicClick} />}
          </Card>
        </div>
      );
    }
