"use client"

import { useState } from "react"
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, LinkIcon, ImageIcon, Code } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"


export function PostEditor({ value, onChange }) {
  const [activeTab, setActiveTab] = useState("write")

  const insertMarkdown = (prefix, suffix = "") => {
    const textarea = document.getElementById("markdown-editor")
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const beforeText = value.substring(0, start)
    const afterText = value.substring(end)

    const newText = beforeText + prefix + selectedText + suffix + afterText
    onChange(newText)

    // Set cursor position after the operation
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, end + prefix.length)
    }, 0)
  }

  const handleToolbarAction = (action) => {
    switch (action) {
      case "bold":
        insertMarkdown("**", "**")
        break
      case "italic":
        insertMarkdown("*", "*")
        break
      case "h1":
        insertMarkdown("# ")
        break
      case "h2":
        insertMarkdown("## ")
        break
      case "ul":
        insertMarkdown("- ")
        break
      case "ol":
        insertMarkdown("1. ")
        break
      case "link":
        insertMarkdown("[", "](url)")
        break
      case "image":
        insertMarkdown("![alt text](", ")")
        break
      case "code":
        insertMarkdown("```\n", "\n```")
        break
      default:
        break
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 rounded-md bg-gray-800 p-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          onClick={() => handleToolbarAction("bold")}
        >
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          onClick={() => handleToolbarAction("italic")}
        >
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6 bg-gray-700" />
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          onClick={() => handleToolbarAction("h1")}
        >
          <Heading1 className="h-4 w-4" />
          <span className="sr-only">Heading 1</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          onClick={() => handleToolbarAction("h2")}
        >
          <Heading2 className="h-4 w-4" />
          <span className="sr-only">Heading 2</span>
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6 bg-gray-700" />
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          onClick={() => handleToolbarAction("ul")}
        >
          <List className="h-4 w-4" />
          <span className="sr-only">Bullet List</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          onClick={() => handleToolbarAction("ol")}
        >
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Numbered List</span>
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6 bg-gray-700" />
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          onClick={() => handleToolbarAction("link")}
        >
          <LinkIcon className="h-4 w-4" />
          <span className="sr-only">Link</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          onClick={() => handleToolbarAction("image")}
        >
          <ImageIcon className="h-4 w-4" />
          <span className="sr-only">Image</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          onClick={() => handleToolbarAction("code")}
        >
          <Code className="h-4 w-4" />
          <span className="sr-only">Code Block</span>
        </Button>
      </div>

      <Tabs defaultValue="write" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="mt-2">
          <Textarea
            id="markdown-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your post content in Markdown..."
            className="min-h-[400px] bg-gray-800 border-gray-700 focus:border-purple-500 font-mono"
          />
        </TabsContent>
        <TabsContent value="preview" className="mt-2">
          <div
            className={cn(
              "min-h-[400px] rounded-md border border-gray-700 bg-gray-800 p-4 overflow-auto",
              "prose prose-invert max-w-none prose-headings:text-gray-100 prose-p:text-gray-300",
              "prose-a:text-purple-400 prose-blockquote:border-l-purple-600 prose-blockquote:text-gray-300",
              "prose-code:bg-gray-700 prose-code:text-gray-300 prose-pre:bg-gray-700",
            )}
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(value),
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Simple markdown renderer for preview
// In a real app, you would use a proper markdown library like marked or remark
function renderMarkdown(markdown){
  // This is a very basic implementation
  const html = markdown
    // Headers
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    // Bold and Italic
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Lists
    .replace(/^- (.*$)/gm, "<ul><li>$1</li></ul>")
    .replace(/^[0-9]+\. (.*$)/gm, "<ol><li>$1</li></ol>")
    // Links and Images
    .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="text-purple-400 hover:underline">$1</a>')
    .replace(/!\[(.*?)\]$$(.*?)$$/g, '<img src="$2" alt="$1" class="rounded-md max-w-full" />')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    // Paragraphs
    .replace(/^(?!<[a-z])/gm, "<p>")
    .replace(/^(?!<\/[a-z])/gm, "</p>")

  return html
}
