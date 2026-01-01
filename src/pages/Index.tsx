import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { BudgetOverview } from "@/components/dashboard/BudgetOverview";
import { ChecklistPreview } from "@/components/dashboard/ChecklistPreview";
import { VendorPreview } from "@/components/dashboard/VendorPreview";
import { CitySelector } from "@/components/dashboard/CitySelector";
import { Calendar, Heart } from "lucide-react";

const Index = () => {
  const [selectedCity, setSelectedCity] = useState("Jaipur");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-primary fill-primary" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Your Wedding Journey
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Plan your perfect day with ease. Track budgets, manage tasks, and discover the best vendors in your city.
          </p>
          
          {/* City Selector */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-muted-foreground">Planning in</span>
            <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-card border border-border text-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <p className="text-3xl font-heading font-semibold text-primary">120</p>
            <p className="text-sm text-muted-foreground">Days to Go</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-3xl font-heading font-semibold text-primary">8</p>
            <p className="text-sm text-muted-foreground">Vendors Booked</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <p className="text-3xl font-heading font-semibold text-primary">65%</p>
            <p className="text-sm text-muted-foreground">Budget Used</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-3xl font-heading font-semibold text-primary">12</p>
            <p className="text-sm text-muted-foreground">Tasks Done</p>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <BudgetOverview />
          </div>
          <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <ChecklistPreview />
          </div>
          <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <VendorPreview />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
