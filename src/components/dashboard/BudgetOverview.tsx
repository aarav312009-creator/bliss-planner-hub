import { budgetCategories } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function BudgetOverview() {
  const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const percentUsed = Math.round((totalSpent / totalAllocated) * 100);

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-3 px-4">
        <CardTitle className="font-heading text-lg">Budget Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-4">
        {/* Total Budget Ring - Smaller for mobile */}
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${percentUsed * 2.51} 251`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-heading font-semibold text-foreground">
                {percentUsed}%
              </span>
              <span className="text-xs text-muted-foreground">Used</span>
            </div>
          </div>
        </div>

        {/* Budget Summary - Side by Side */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 rounded-lg bg-secondary/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Total</p>
            <p className="text-base font-semibold text-foreground">{formatCurrency(totalAllocated)}</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Spent</p>
            <p className="text-base font-semibold text-foreground">{formatCurrency(totalSpent)}</p>
          </div>
        </div>

        {/* Category Breakdown - Compact */}
        <div className="space-y-3">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">By Category</h4>
          {budgetCategories.slice(0, 4).map((category) => {
            const categoryPercent = Math.round((category.spent / category.allocated) * 100);
            return (
              <div key={category.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="text-sm">{category.icon}</span>
                    <span className="text-foreground">{category.name}</span>
                  </span>
                  <span className="text-muted-foreground text-[10px]">
                    {formatCurrency(category.spent)}
                  </span>
                </div>
                <Progress value={categoryPercent} className="h-1.5" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
