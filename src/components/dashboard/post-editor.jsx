"use client";

import React, { useState, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function PostEditor() {
  const [markdown, setMarkdown] = useState(
    "## Hello, Markdown!\n\nWrite something **cool** here."
  );
  const [activeTab, setActiveTab] = useState("write");
  const textareaRef = useRef(null);

  const insertMarkdown = (prefix, suffix = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    const beforeText = markdown.substring(0, start);
    const afterText = markdown.substring(end);

    // Preserve space intentionally when inserting markdown
    const newText = `${beforeText}${prefix}${selectedText}${suffix}${afterText}`;
    setMarkdown(newText);

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
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-4">
      <div className="flex items-center gap-1 rounded-md bg-zinc-800 p-1 mb-4">
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
        <Separator orientation="vertical" className="mx-1 h-6 bg-zinc-700" />
        <ToolbarButton
          icon={<Heading1 className="h-4 w-4" />}
          label="H1"
          onClick={() => handleToolbarAction("h1")}
        />
        <ToolbarButton
          icon={<Heading2 className="h-4 w-4" />}
          label="H2"
          onClick={() => handleToolbarAction("h2")}
        />
        <Separator orientation="vertical" className="mx-1 h-6 bg-zinc-700" />
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
        <Separator orientation="vertical" className="mx-1 h-6 bg-zinc-700" />
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
        <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="mt-2">
          <Textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write your content in Markdown..."
            className="min-h-[400px] bg-zinc-800 border border-zinc-700 focus:border-purple-500 font-mono"
          />
        </TabsContent>
        <TabsContent value="preview" className="mt-2">
          <div
            className={cn(
              "min-h-[400px] rounded-md border border-zinc-700 bg-zinc-800 p-4 overflow-auto",
              "prose prose-invert max-w-none prose-headings:text-gray-100 prose-p:text-gray-300",
              "prose-a:text-purple-400 prose-blockquote:border-l-purple-600 prose-blockquote:text-gray-300",
              "prose-code:bg-zinc-700 prose-code:text-gray-300 prose-pre:bg-zinc-700"
            )}
          >
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-zinc-700 px-1 rounded" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ToolbarButton({ icon, label, onClick }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-8 px-2 text-gray-400 hover:bg-zinc-700 hover:text-white"
      onClick={onClick}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </Button>
  );
}
