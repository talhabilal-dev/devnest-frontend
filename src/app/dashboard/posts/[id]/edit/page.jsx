"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { PostEditor } from "@/components/dashboard/post-editor"
import { AIPostGenerator } from "@/components/dashboard/ai-post-generator"
import { AIPostAnalyzer } from "@/components/dashboard/ai-post-analyzer"
import { ImageUpload } from "@/components/dashboard/image-upload"
import { ArrowLeft, Save } from "lucide-react"

// Sample post data - in a real app, this would come from an API
const samplePost = {
  id: 1,
  title: "The Future of Web Development in 2025",
  excerpt: "Exploring the upcoming trends and technologies that will shape the web development landscape.",
  content:
    "# The Future of Web Development in 2025\n\nAs we approach 2025, the web development landscape continues to evolve at a rapid pace. New technologies, frameworks, and methodologies are emerging, changing how developers build applications and how users interact with them.\n\n## AI-Driven Development\n\nArtificial Intelligence is becoming an integral part of the development process. From code completion to automated testing, AI tools are helping developers work more efficiently and produce higher quality code.\n\n## WebAssembly Goes Mainstream\n\nWebAssembly (Wasm) is gaining traction as a way to run high-performance code in the browser. By 2025, we expect to see more applications leveraging Wasm for complex computations, gaming, and multimedia processing.\n\n## The Rise of Edge Computing\n\nEdge computing is moving processing closer to where data is generated, reducing latency and improving user experience. Frameworks like Next.js and Remix are already embracing this approach with server components and distributed rendering.",
  category: "technology",
  tags: "webdev, future, trends, ai",
  status: "published",
  commentsEnabled: true,
  featured: true,
  image: "/placeholder.svg?height=400&width=800",
}

export default function EditPostPage({ params }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [postContent, setPostContent] = useState("")
  const [postTitle, setPostTitle] = useState("")
  const [postExcerpt, setPostExcerpt] = useState("")
  const [postCategory, setPostCategory] = useState("")
  const [postTags, setPostTags] = useState("")
  const [postStatus, setPostStatus] = useState("")
  const [commentsEnabled, setCommentsEnabled] = useState(true)
  const [featured, setFeatured] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch post data
    const fetchPost = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would fetch the post data from an API
      // For now, we'll use the sample data
      setPostTitle(samplePost.title)
      setPostExcerpt(samplePost.excerpt)
      setPostContent(samplePost.content)
      setPostCategory(samplePost.category)
      setPostTags(samplePost.tags)
      setPostStatus(samplePost.status)
      setCommentsEnabled(samplePost.commentsEnabled)
      setFeatured(samplePost.featured)

      setIsLoading(false)
    }

    fetchPost()
  }, [params.id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would typically send the form data to your API
    console.log({
      id: params.id,
      title: postTitle,
      excerpt: postExcerpt,
      content: postContent,
      category: postCategory,
      tags: postTags,
      status: postStatus,
      commentsEnabled,
      featured,
    })

    setIsSubmitting(false)
    router.push("/dashboard/posts")
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading post...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <DashboardHeader heading={`Edit Post: ${postTitle}`}>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={() => router.push("/dashboard/posts")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            type="submit"
            form="post-form"
            size="sm"
            className="bg-purple-600 hover:bg-purple-700"
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DashboardHeader>

      <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Post Title</Label>
                <Input
                  id="title"
                  placeholder="Enter post title"
                  className="bg-gray-800 border-gray-700 focus:border-purple-500"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief summary of your post"
                  className="min-h-[80px] bg-gray-800 border-gray-700 focus:border-purple-500"
                  value={postExcerpt}
                  onChange={(e) => setPostExcerpt(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Featured Image</Label>
                <ImageUpload initialImage={samplePost.image} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="ai-generate">AI Generate</TabsTrigger>
            <TabsTrigger value="ai-analyze">AI Analyze</TabsTrigger>
          </TabsList>
          <TabsContent value="editor" className="mt-4">
            <Card className="border-gray-800 bg-gray-900">
              <CardContent className="pt-6">
                <PostEditor value={postContent} onChange={setPostContent} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ai-generate" className="mt-4">
            <AIPostGenerator onGenerate={(content) => setPostContent(content)} />
          </TabsContent>
          <TabsContent value="ai-analyze" className="mt-4">
            <AIPostAnalyzer content={postContent} />
          </TabsContent>
        </Tabs>

        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Categories & Tags</h3>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={postCategory} onValueChange={setPostCategory}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="career">Career</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Enter tags separated by commas"
                    className="bg-gray-800 border-gray-700 focus:border-purple-500"
                    value={postTags}
                    onChange={(e) => setPostTags(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Publishing Options</h3>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={postStatus} onValueChange={setPostStatus}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="comments-enabled">Enable Comments</Label>
                    <Switch id="comments-enabled" checked={commentsEnabled} onCheckedChange={setCommentsEnabled} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Featured Post</Label>
                    <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6 bg-gray-800" />

            <div className="flex justify-end gap-2">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                Save as Draft
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
