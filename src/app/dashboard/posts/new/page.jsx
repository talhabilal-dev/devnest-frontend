"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { PostEditor } from "@/components/dashboard/post-editor";
import { AIPostGenerator } from "@/components/dashboard/ai-post-generator";
import { AIPostAnalyzer } from "@/components/dashboard/ai-post-analyzer";
import { ImageUpload } from "@/components/dashboard/image-upload";
import { ArrowLeft, Save } from "lucide-react";

export default function NewPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postExcerpt, setPostExcerpt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Here you would typically send the form data to your API
    console.log({
      title: postTitle,
      excerpt: postExcerpt,
      content: postContent,
    });

    setIsSubmitting(false);
    router.push("/dashboard/posts");
  };

  return (
    <div className="space-y-6">
      <DashboardHeader heading="Create New Post">
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
            {isSubmitting ? "Saving..." : "Save"}
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
                <ImageUpload />
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
            <AIPostGenerator
              onGenerate={(content) => setPostContent(content)}
            />
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
                  <Select>
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
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Publishing Options</h3>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="draft">
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
                    <Switch id="comments-enabled" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Featured Post</Label>
                    <Switch id="featured" />
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6 bg-gray-800" />

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Save as Draft
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
