import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { tasks as initialTasks, Task } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const timelines = ["All", "12 months", "10 months", "9 months", "8 months", "6 months", "5 months", "4 months", "3 months", "2 months", "1 month", "2 weeks"];

const Checklist = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTimeline, setSelectedTimeline] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesTimeline = selectedTimeline === "All" || task.timeline === selectedTimeline;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTimeline && matchesSearch;
  });

  // Group tasks by timeline
  const groupedTasks = filteredTasks.reduce((acc, task) => {
    if (!acc[task.timeline]) {
      acc[task.timeline] = [];
    }
    acc[task.timeline].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-heading text-4xl font-semibold text-foreground mb-2">
            Planning Checklist
          </h1>
          <p className="text-muted-foreground">
            Stay organized with your wedding planning tasks
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 bg-card border-border animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {completedCount} of {totalCount} tasks complete
                  </span>
                </div>
                <div className="h-4 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-4xl font-heading font-semibold text-primary">{progressPercent}%</p>
                <p className="text-sm text-muted-foreground">Complete</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["All", "12 months", "6 months", "3 months", "1 month"].map((timeline) => (
              <Button
                key={timeline}
                variant={selectedTimeline === timeline ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeline(timeline)}
                className="shrink-0"
              >
                {timeline}
              </Button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          {Object.entries(groupedTasks).map(([timeline, timelineTasks]) => (
            <Card key={timeline} className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading text-xl">{timeline} before</CardTitle>
                  <Badge variant="secondary">
                    {timelineTasks.filter((t) => t.completed).length}/{timelineTasks.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {timelineTasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-colors",
                      task.completed
                        ? "bg-muted/50"
                        : "bg-secondary/30 hover:bg-secondary/50"
                    )}
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="border-primary data-[state=checked]:bg-primary"
                    />
                    <div className="flex-1">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          task.completed
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        )}
                      >
                        {task.title}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {task.category}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Task Button */}
        <Button className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </Layout>
  );
};

export default Checklist;
