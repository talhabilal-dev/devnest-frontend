import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

const posts = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    status: "published",
    date: new Date(2025, 3, 15),
    views: 245,
  },
  {
    id: 2,
    title: "Mastering the Art of Productivity",
    status: "published",
    date: new Date(2025, 3, 12),
    views: 189,
  },
  {
    id: 3,
    title: "Understanding React Server Components",
    status: "draft",
    date: new Date(2025, 3, 10),
    views: 0,
  },
  {
    id: 4,
    title: "The Psychology of Color in Design",
    status: "draft",
    date: new Date(2025, 3, 8),
    views: 0,
  },
];

export function RecentPosts() {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/dashboard/posts/${post.id}`}
          className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950/50 p-3 transition-colors hover:bg-gray-800/50"
        >
          <div className="space-y-1">
            <div className="font-medium">{post.title}</div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{formatDistanceToNow(post.date, { addSuffix: true })}</span>
              {post.status === "published" && <span>• {post.views} views</span>}
            </div>
          </div>
          <Badge
            className={
              post.status === "published"
                ? "bg-green-600/20 text-green-400 hover:bg-green-600/30 hover:text-green-400"
                : "bg-amber-600/20 text-amber-400 hover:bg-amber-600/30 hover:text-amber-400"
            }
          >
            {post.status}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
