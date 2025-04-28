import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PenSquare, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

const posts = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    status: "published",
    date: new Date(2025, 3, 15),
    views: 245,
    comments: 12,
  },
  {
    id: 2,
    title: "Mastering the Art of Productivity",
    status: "published",
    date: new Date(2025, 3, 12),
    views: 189,
    comments: 8,
  },
  {
    id: 3,
    title: "Understanding React Server Components",
    status: "draft",
    date: new Date(2025, 3, 10),
    views: 0,
    comments: 0,
  },
  {
    id: 4,
    title: "The Psychology of Color in Design",
    status: "draft",
    date: new Date(2025, 3, 8),
    views: 0,
    comments: 0,
  },
  {
    id: 5,
    title: "10 Tips for Better Code Reviews",
    status: "published",
    date: new Date(2025, 3, 5),
    views: 156,
    comments: 5,
  },
  {
    id: 6,
    title: "Building Accessible Web Applications",
    status: "published",
    date: new Date(2025, 3, 2),
    views: 132,
    comments: 7,
  },
]

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader heading="Posts">
        <Button className="bg-purple-600 hover:bg-purple-700" asChild>
          <Link href="/dashboard/posts/new">
            <PenSquare className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </DashboardHeader>

      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription className="text-gray-400">Manage your blog posts, drafts, and publications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search posts..."
                className="pl-10 bg-gray-800 border-gray-700 focus:border-purple-500"
              />
            </div>

            <div className="rounded-lg border border-gray-800">
              <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-400">
                <div className="col-span-6">Title</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-1">Views</div>
                <div className="col-span-1">Comments</div>
              </div>

              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/dashboard/posts/${post.id}`}
                  className="grid grid-cols-12 gap-4 border-t border-gray-800 p-4 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="col-span-6 font-medium">{post.title}</div>
                  <div className="col-span-2">
                    <Badge
                      className={
                        post.status === "published"
                          ? "bg-green-600/20 text-green-400 hover:bg-green-600/30 hover:text-green-400"
                          : "bg-amber-600/20 text-amber-400 hover:bg-amber-600/30 hover:text-amber-400"
                      }
                    >
                      {post.status}
                    </Badge>
                  </div>
                  <div className="col-span-2 text-gray-400">{formatDistanceToNow(post.date, { addSuffix: true })}</div>
                  <div className="col-span-1 text-gray-400">{post.views}</div>
                  <div className="col-span-1 text-gray-400">{post.comments}</div>
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
