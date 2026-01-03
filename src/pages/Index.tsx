import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { BudgetOverview } from "@/components/dashboard/BudgetOverview";
import { ChecklistPreview } from "@/components/dashboard/ChecklistPreview";
import { VendorPreview } from "@/components/dashboard/VendorPreview";
import { CitySelector } from "@/components/dashboard/CitySelector";
import { Calendar, Heart } from "lucide-react";

const Index = () => {
  const [selectedCity, setSelectedCity] = useState("Jaipur");

  return (
    <MobileLayout>
      <div className="px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="text-center animate-fade-in">
          <h1 className="font-heading text-2xl font-semibold text-foreground mb-1">
            Your Wedding Journey
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Plan your perfect day with ease
          </p>
          
          {/* City Selector */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">Planning in</span>
            <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
          </div>
        </div>

        {/* Quick Stats - Compact Grid */}
        <div className="grid grid-cols-4 gap-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="p-3 rounded-xl bg-card border border-border text-center">
            <p className="text-xl font-heading font-semibold text-primary">120</p>
            <p className="text-[10px] text-muted-foreground">Days</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border text-center">
            <p className="text-xl font-heading font-semibold text-primary">8</p>
            <p className="text-[10px] text-muted-foreground">Booked</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border text-center">
            <p className="text-xl font-heading font-semibold text-primary">65%</p>
            <p className="text-[10px] text-muted-foreground">Budget</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border text-center">
            <p className="text-xl font-heading font-semibold text-primary">12</p>
            <p className="text-[10px] text-muted-foreground">Tasks</p>
          </div>
        </div>

        {/* Dashboard Cards - Stacked for Mobile */}
        <div className="space-y-4">
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <BudgetOverview />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <ChecklistPreview />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <VendorPreview />
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
