import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, FileText, MessageSquare, ThumbsUp } from "lucide-react";
import { useUser } from "@/lib/UserContext";

export function StatsCards() {
  const { user, loading } = useUser();

  console.log("user", user);

  const stats = [
    {
      title: "Total Posts",
      value: user?.totalPosts || 0,
      icon: FileText,
    },
    {
      title: "Total Views",
      value: user?.totalViews || 0,
      icon: Eye,
    },
    {
      title: "Comments",
      value: user?.totalComments || 0,
      icon: MessageSquare,
    },
    {
      title: "Likes",
      value: user?.totalLikes || 0,
      icon: ThumbsUp,
    },
  ];
  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-gray-800 bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-500">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl text-zinc-100 font-bold text-center">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
