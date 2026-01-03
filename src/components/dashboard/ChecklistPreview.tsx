import { useState } from "react";
import { tasks as initialTasks, Task } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ChecklistPreview() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  // Show only first 4 tasks in mobile preview
  const previewTasks = tasks.slice(0, 4);

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-3 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading text-lg">Checklist</CardTitle>
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            {completedCount}/{totalCount}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4">
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground text-right">
            {progressPercent}% complete
          </p>
        </div>

        {/* Task List - Compact */}
        <div className="space-y-2">
          {previewTasks.map((task) => (
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
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm truncate",
                    task.completed
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  )}
                >
                  {task.title}
                </p>
              </div>
              <Badge variant="outline" className="text-[10px] shrink-0 px-1.5 py-0">
                {task.timeline}
              </Badge>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <Link 
          to="/checklist"
          className="flex items-center justify-center gap-1 text-xs text-primary font-medium pt-1 active:opacity-70"
        >
          View all {totalCount} tasks
          <ChevronRight className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}
