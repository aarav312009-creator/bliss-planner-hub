import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { tasks as initialTasks, Task } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Checklist = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTimeline, setSelectedTimeline] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const toggleSection = (timeline: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [timeline]: !prev[timeline],
    }));
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

  const timelineFilters = ["All", "12 mo", "6 mo", "3 mo", "1 mo"];

  return (
    <MobileLayout title="Checklist" showLogo={false}>
      <div className="px-4 py-4 space-y-4">
        {/* Progress Card */}
        <Card className="bg-card border-border">
          <CardContent className="py-4 px-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-foreground">Progress</span>
                  <span className="text-xs text-muted-foreground">
                    {completedCount}/{totalCount}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-heading font-semibold text-primary">{progressPercent}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border h-10 text-sm"
          />
        </div>

        {/* Timeline Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          {timelineFilters.map((timeline) => (
            <Button
              key={timeline}
              variant={selectedTimeline === (timeline === "All" ? "All" : timeline.replace(" mo", " months")) ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeline(timeline === "All" ? "All" : timeline.replace(" mo", " months"))}
              className="shrink-0 h-8 text-xs px-4"
            >
              {timeline}
            </Button>
          ))}
        </div>

        {/* Task Groups */}
        <div className="space-y-3">
          {Object.entries(groupedTasks).map(([timeline, timelineTasks]) => {
            const isExpanded = expandedSections[timeline] !== false;
            const completedInGroup = timelineTasks.filter((t) => t.completed).length;
            
            return (
              <Card key={timeline} className="bg-card border-border overflow-hidden">
                <button
                  onClick={() => toggleSection(timeline)}
                  className="w-full flex items-center justify-between p-3 active:bg-secondary/30"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-sm font-semibold text-foreground">
                      {timeline} before
                    </span>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {completedInGroup}/{timelineTasks.length}
                    </Badge>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                
                {isExpanded && (
                  <CardContent className="pt-0 pb-2 px-2 space-y-1.5">
                    {timelineTasks.map((task) => (
                      <div
                        key={task.id}
                        className={cn(
                          "flex items-center gap-3 p-2.5 rounded-lg transition-colors active:scale-[0.98]",
                          task.completed ? "bg-muted/50" : "bg-secondary/30"
                        )}
                        onClick={() => toggleTask(task.id)}
                      >
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="border-primary data-[state=checked]:bg-primary h-5 w-5"
                        />
                        <p
                          className={cn(
                            "flex-1 text-sm",
                            task.completed
                              ? "text-muted-foreground line-through"
                              : "text-foreground"
                          )}
                        >
                          {task.title}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Floating Add Button */}
        <Button className="fixed bottom-20 right-4 rounded-full h-12 w-12 shadow-lg z-40">
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </MobileLayout>
  );
};

export default Checklist;
