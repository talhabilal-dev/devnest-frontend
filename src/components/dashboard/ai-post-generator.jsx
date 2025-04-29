"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sparkles, Loader2 } from "lucide-react"

export function AIPostGenerator({ onGenerate }) {
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("informative")
  const [length, setLength] = useState([500])
  const [keywords, setKeywords] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPreview, setGeneratedPreview] = useState("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGeneratedPreview("")

    // Simulate API call to AI service
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Sample generated content based on the topic
    const sampleContent = `# ${topic}

## Introduction

This is an AI-generated article about ${topic}. The tone is ${tone} and it includes keywords like ${keywords}.

## Main Points

- First key point about ${topic}
- Second important aspect to consider
- Analysis of current trends
- Future predictions

## Detailed Analysis

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.

## Conclusion

In conclusion, ${topic} represents a significant area of interest with many implications for the future. By understanding the key concepts discussed in this article, readers can gain valuable insights into this important topic.`

    setGeneratedPreview(sampleContent)
    setIsGenerating(false)
  }

  const handleApply = () => {
    onGenerate(generatedPreview)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle>AI Content Generator</CardTitle>
          <CardDescription className="text-gray-400">
            Generate blog post content using AI based on your specifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic or Title</Label>
              <Input
                id="topic"
                placeholder="E.g., The Future of Web Development"
                className="bg-gray-800 border-gray-700 focus:border-purple-500"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Writing Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="informative">Informative</SelectItem>
                  <SelectItem value="conversational">Conversational</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="length">Content Length (words)</Label>
                <span className="text-sm text-gray-400">{length[0]}</span>
              </div>
              <Slider
                id="length"
                min={300}
                max={2000}
                step={100}
                value={length}
                onValueChange={setLength}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (comma separated)</Label>
              <Input
                id="keywords"
                placeholder="E.g., technology, trends, future"
                className="bg-gray-800 border-gray-700 focus:border-purple-500"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={!topic || isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Content
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle>Generated Preview</CardTitle>
          <CardDescription className="text-gray-400">
            Review the AI-generated content before applying it to your post
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isGenerating ? (
            <div className="flex h-[400px] items-center justify-center">
              <div className="text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-purple-600" />
                <p className="mt-2 text-gray-400">Generating content...</p>
                <p className="text-sm text-gray-500">This may take a few moments</p>
              </div>
            </div>
          ) : generatedPreview ? (
            <div className="space-y-4">
              <div className="max-h-[400px] overflow-y-auto rounded-md border border-gray-700 bg-gray-800 p-4">
                <div className="prose prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(generatedPreview) }} />
                </div>
              </div>
              <Button onClick={handleApply} className="w-full bg-purple-600 hover:bg-purple-700">
                Apply to Editor
              </Button>
            </div>
          ) : (
            <div className="flex h-[400px] items-center justify-center text-center">
              <div>
                <Sparkles className="mx-auto h-12 w-12 text-gray-600" />
                <p className="mt-4 text-gray-400">
                  Fill in the details and click "Generate Content" to create your post
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Reuse the same markdown renderer from PostEditor
function renderMarkdown(markdown){
  const html = markdown
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^- (.*$)/gm, "<ul><li>$1</li></ul>")
    .replace(/^[0-9]+\. (.*$)/gm, "<ol><li>$1</li></ol>")
    .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="text-purple-400 hover:underline">$1</a>')
    .replace(/!\[(.*?)\]$$(.*?)$$/g, '<img src="$2" alt="$1" class="rounded-md max-w-full" />')
    .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    .replace(/^(?!<[a-z])/gm, "<p>")
    .replace(/^(?!<\/[a-z])/gm, "</p>")

  return html
}
