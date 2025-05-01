"use client";

import { useState, useRef } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  LinkIcon,
  ImageIcon,
  Code,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { marked } from "marked"; // Ensure you have marked installed

export function PostEditor({ value, onChange }) {
  const [activeTab, setActiveTab] = useState("write");
  const textareaRef = useRef(null);

  const insertMarkdown = (prefix, suffix = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    const newText = beforeText + prefix + selectedText + suffix + afterText;
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleToolbarAction = (action) => {
    switch (action) {
      case "bold":
        insertMarkdown("**", "**");
        break;
      case "italic":
        insertMarkdown("*", "*");
        break;
      case "h1":
        insertMarkdown("# ");
        break;
      case "h2":
        insertMarkdown("## ");
        break;
      case "ul":
        insertMarkdown("- ");
        break;
      case "ol":
        insertMarkdown("1. ");
        break;
      case "link":
        insertMarkdown("[", "](url)");
        break;
      case "image":
        insertMarkdown("![alt text](", ")");
        break;
      case "code":
        insertMarkdown("```\n", "\n```");
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 rounded-md bg-gray-800 p-1">
        <ToolbarButton
          icon={<Bold className="h-4 w-4" />}
          label="Bold"
          onClick={() => handleToolbarAction("bold")}
        />
        <ToolbarButton
          icon={<Italic className="h-4 w-4" />}
          label="Italic"
          onClick={() => handleToolbarAction("italic")}
        />
        <Separator orientation="vertical" className="mx-1 h-6 bg-gray-700" />
        <ToolbarButton
          icon={<Heading1 className="h-4 w-4" />}
          label="Heading 1"
          onClick={() => handleToolbarAction("h1")}
        />
        <ToolbarButton
          icon={<Heading2 className="h-4 w-4" />}
          label="Heading 2"
          onClick={() => handleToolbarAction("h2")}
        />
        <Separator orientation="vertical" className="mx-1 h-6 bg-gray-700" />
        <ToolbarButton
          icon={<List className="h-4 w-4" />}
          label="Bullet List"
          onClick={() => handleToolbarAction("ul")}
        />
        <ToolbarButton
          icon={<ListOrdered className="h-4 w-4" />}
          label="Numbered List"
          onClick={() => handleToolbarAction("ol")}
        />
        <Separator orientation="vertical" className="mx-1 h-6 bg-gray-700" />
        <ToolbarButton
          icon={<LinkIcon className="h-4 w-4" />}
          label="Link"
          onClick={() => handleToolbarAction("link")}
        />
        <ToolbarButton
          icon={<ImageIcon className="h-4 w-4" />}
          label="Image"
          onClick={() => handleToolbarAction("image")}
        />
        <ToolbarButton
          icon={<Code className="h-4 w-4" />}
          label="Code Block"
          onClick={() => handleToolbarAction("code")}
        />
      </div>

      <Tabs
        defaultValue="write"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="mt-2">
          <Textarea
            ref={textareaRef}
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
              "prose-code:bg-gray-700 prose-code:text-gray-300 prose-pre:bg-gray-700"
            )}
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(value),
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper button component to reduce repetition
function ToolbarButton({ icon, label, onClick }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-8 px-2 text-gray-400 hover:bg-gray-700 hover:text-white"
      onClick={onClick}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </Button>
  );
}

// Simple markdown renderer
function renderMarkdown(markdown) {
  // Assume 'marked' is globally imported or available
  return marked.parse(markdown || "");
}
