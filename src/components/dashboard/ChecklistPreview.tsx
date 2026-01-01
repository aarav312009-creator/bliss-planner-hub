import { useState } from "react";
import { tasks as initialTasks, Task } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

  // Show only first 6 tasks in preview
  const previewTasks = tasks.slice(0, 6);

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading text-2xl">Planning Checklist</CardTitle>
          <Badge variant="secondary" className="text-sm">
            {completedCount}/{totalCount} done
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            {progressPercent}% complete
          </p>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {previewTasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-colors",
                task.completed ? "bg-muted/50" : "bg-secondary/30 hover:bg-secondary/50"
              )}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="border-primary data-[state=checked]:bg-primary"
              />
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium truncate",
                    task.completed
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  )}
                >
                  {task.title}
                </p>
              </div>
              <Badge variant="outline" className="text-xs shrink-0">
                {task.timeline}
              </Badge>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground text-center pt-2">
          +{totalCount - 6} more tasks
        </p>
      </CardContent>
    </Card>
  );
}
