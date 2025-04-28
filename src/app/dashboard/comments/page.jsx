import { DashboardHeader } from "@/components/dashboard/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const comments = [
  {
    id: 1,
    author: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SM",
    },
    content: "This is a fantastic article! I've learned so much from it.",
    postTitle: "The Future of Web Development in 2025",
    postId: 1,
    date: new Date(2025, 3, 16),
  },
  {
    id: 2,
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
    content: "I disagree with some points, but overall a good read.",
    postTitle: "The Future of Web Development in 2025",
    postId: 1,
    date: new Date(2025, 3, 15),
  },
  {
    id: 3,
    author: {
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EJ",
    },
    content: "Thanks for sharing these productivity tips!",
    postTitle: "Mastering the Art of Productivity",
    postId: 2,
    date: new Date(2025, 3, 14),
  },
  {
    id: 4,
    author: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DW",
    },
    content: "I've implemented these strategies and they work great!",
    postTitle: "Mastering the Art of Productivity",
    postId: 2,
    date: new Date(2025, 3, 13),
  },
  {
    id: 5,
    author: {
      name: "Jessica Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JB",
    },
    content:
      "Great insights on color psychology. I'd love to see more examples.",
    postTitle: "The Psychology of Color in Design",
    postId: 4,
    date: new Date(2025, 3, 12),
  },
  {
    id: 6,
    author: {
      name: "Robert Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RT",
    },
    content: "Your code review tips have been invaluable for our team.",
    postTitle: "10 Tips for Better Code Reviews",
    postId: 5,
    date: new Date(2025, 3, 11),
  },
];

export default function CommentsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        heading="Comments"
        text="Manage and respond to comments on your posts."
      />

      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle>All Comments</CardTitle>
          <CardDescription className="text-gray-400">
            View and moderate comments from your readers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search comments..."
                className="pl-10 bg-gray-800 border-gray-700 focus:border-purple-500"
              />
            </div>

            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-lg border border-gray-800 p-4 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={comment.author.avatar || "/placeholder.svg"}
                        alt={comment.author.name}
                      />
                      <AvatarFallback>{comment.author.initials}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">
                            {comment.author.name}
                          </span>
                          <span className="text-xs text-gray-400 ml-2">
                            {formatDistanceToNow(comment.date, {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          On:{" "}
                          <span className="text-purple-400">
                            {comment.postTitle}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-300">{comment.content}</p>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          Reply
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
