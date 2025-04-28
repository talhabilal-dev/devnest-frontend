import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
];

export function RecentComments() {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Link
          key={comment.id}
          href={`/dashboard/comments/${comment.id}`}
          className="flex gap-3 rounded-lg border border-gray-800 bg-gray-950/50 p-3 transition-colors hover:bg-gray-800/50"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={comment.author.avatar || "/placeholder.svg"}
              alt={comment.author.name}
            />
            <AvatarFallback>{comment.author.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{comment.author.name}</span>
              <span className="text-xs text-gray-400">
                {formatDistanceToNow(comment.date, { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm text-gray-300 line-clamp-1">
              {comment.content}
            </p>
            <p className="text-xs text-gray-400">
              On: <span className="text-purple-400">{comment.postTitle}</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
