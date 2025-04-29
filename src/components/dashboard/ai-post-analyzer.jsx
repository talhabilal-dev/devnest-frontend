"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Info, Lightbulb } from "lucide-react";

export function AIPostAnalyzer({ content }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [seoScore, setSeoScore] = useState(0);
  const [readabilityScore, setReadabilityScore] = useState(0);
  const [sentimentScore, setSentimentScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const handleAnalyze = async () => {
    if (!content.trim()) {
      return;
    }

    setIsAnalyzing(true);
    setAnalysisComplete(false);

    // Simulate API call to AI service
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate random scores for demo purposes
    const randomSeoScore = Math.floor(Math.random() * 40) + 60;
    const randomReadabilityScore = Math.floor(Math.random() * 40) + 60;
    const randomSentimentScore = Math.floor(Math.random() * 40) + 60;

    // Sample suggestions based on content length
    const sampleSuggestions = [
      "Consider adding more headings to break up the content",
      "The introduction could be more engaging",
      "Add more transition words to improve flow",
      "Consider adding a call-to-action at the end",
      "The content could benefit from more examples",
    ];

    // Extract potential keywords from content
    const words = content.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
    const wordCounts = {};
    words.forEach((word) => {
      if (
        ![
          "this",
          "that",
          "with",
          "from",
          "have",
          "were",
          "they",
          "their",
          "about",
        ].includes(word)
      ) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });

    const extractedKeywords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);

    setSeoScore(randomSeoScore);
    setReadabilityScore(randomReadabilityScore);
    setSentimentScore(randomSentimentScore);
    setSuggestions(
      sampleSuggestions.slice(0, 3 + Math.floor(Math.random() * 3))
    );
    setKeywords(extractedKeywords);

    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  useEffect(() => {
    if (content && content.length > 100) {
      handleAnalyze();
    } else {
      setAnalysisComplete(false);
    }
  }, [content]);

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Good";
    if (score >= 60) return "Average";
    return "Needs Improvement";
  };

  if (!content.trim()) {
    return (
      <Card className="border-gray-800 bg-gray-900">
        <CardContent className="pt-6">
          <div className="flex h-[200px] items-center justify-center text-center">
            <div>
              <Info className="mx-auto h-12 w-12 text-gray-600" />
              <p className="mt-4 text-gray-400">
                Add some content to your post to see AI analysis
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-800 bg-gray-900">
      <CardHeader>
        <CardTitle>AI Content Analysis</CardTitle>
        <CardDescription className="text-gray-400">
          Get insights and suggestions to improve your post
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isAnalyzing ? (
          <div className="flex h-[300px] items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-purple-600" />
              <p className="mt-2 text-gray-400">Analyzing your content...</p>
              <p className="text-sm text-gray-500">
                This may take a few moments
              </p>
            </div>
          </div>
        ) : analysisComplete ? (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">SEO Score</span>
                  <span
                    className={`text-sm font-bold ${getScoreColor(seoScore)}`}
                  >
                    {seoScore}/100
                  </span>
                </div>
                <Progress
                  value={seoScore}
                  className="h-2"
                  indicatorClassName="bg-purple-600"
                />
                <span className="text-xs text-gray-400">
                  {getScoreLabel(seoScore)}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Readability</span>
                  <span
                    className={`text-sm font-bold ${getScoreColor(
                      readabilityScore
                    )}`}
                  >
                    {readabilityScore}/100
                  </span>
                </div>
                <Progress
                  value={readabilityScore}
                  className="h-2"
                  indicatorClassName="bg-purple-600"
                />
                <span className="text-xs text-gray-400">
                  {getScoreLabel(readabilityScore)}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sentiment</span>
                  <span
                    className={`text-sm font-bold ${getScoreColor(
                      sentimentScore
                    )}`}
                  >
                    {sentimentScore}/100
                  </span>
                </div>
                <Progress
                  value={sentimentScore}
                  className="h-2"
                  indicatorClassName="bg-purple-600"
                />
                <span className="text-xs text-gray-400">
                  {getScoreLabel(sentimentScore)}
                </span>
              </div>
            </div>

            <Tabs defaultValue="suggestions" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
              </TabsList>
              <TabsContent value="suggestions" className="mt-4 space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 rounded-md border border-gray-800 bg-gray-800/50 p-3"
                  >
                    <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                    <p className="text-sm text-gray-300">{suggestion}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="keywords" className="mt-4">
                <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
                  <h3 className="mb-2 text-sm font-medium">
                    Detected Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        className="bg-purple-600/20 text-purple-400"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-gray-400">
                    These keywords were detected in your content. Consider using
                    them in your title, headings, and meta description for
                    better SEO.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              onClick={handleAnalyze}
              variant="outline"
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Refresh Analysis
            </Button>
          </div>
        ) : (
          <div className="flex h-[300px] items-center justify-center">
            <Button
              onClick={handleAnalyze}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Analyze Content
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
