import { budgetCategories } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function BudgetOverview() {
  const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const percentUsed = Math.round((totalSpent / totalAllocated) * 100);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="font-heading text-2xl">Budget Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Budget Ring */}
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${percentUsed * 2.51} 251`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-heading font-semibold text-foreground">
                {percentUsed}%
              </span>
              <span className="text-sm text-muted-foreground">Used</span>
            </div>
          </div>
        </div>

        {/* Budget Summary */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <p className="text-xl font-semibold text-foreground">{formatCurrency(totalAllocated)}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground">Spent</p>
            <p className="text-xl font-semibold text-foreground">{formatCurrency(totalSpent)}</p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Category Breakdown</h4>
          {budgetCategories.map((category) => {
            const categoryPercent = Math.round((category.spent / category.allocated) * 100);
            return (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span className="text-foreground">{category.name}</span>
                  </span>
                  <span className="text-muted-foreground">
                    {formatCurrency(category.spent)} / {formatCurrency(category.allocated)}
                  </span>
                </div>
                <Progress value={categoryPercent} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
