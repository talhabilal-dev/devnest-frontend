import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, FileText, MessageSquare, ThumbsUp } from "lucide-react";

export function StatsCards() {
  const stats = [
    {
      title: "Total Posts",
      value: "12",
      icon: FileText,
      description: "2 posts this month",
    },
    {
      title: "Total Views",
      value: "2,345",
      icon: Eye,
      description: "+20% from last month",
    },
    {
      title: "Comments",
      value: "45",
      icon: MessageSquare,
      description: "5 new this week",
    },
    {
      title: "Likes",
      value: "132",
      icon: ThumbsUp,
      description: "+12% from last month",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-gray-800 bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-gray-400">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
