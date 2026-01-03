import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { vendors as allVendors, categories, cities, Vendor } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Heart, Search, MapPin, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Vendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>(allVendors);
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleShortlist = (vendorId: string) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId ? { ...v, shortlisted: !v.shortlisted } : v
      )
    );
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesCity = selectedCity === "All" || vendor.city === selectedCity;
    const matchesCategory = selectedCategory === "All" || vendor.category === selectedCategory;
    const matchesPrice = selectedPrice === "All" || vendor.priceRange === Number(selectedPrice);
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesCategory && matchesPrice && matchesSearch;
  });

  const getPriceDisplay = (range: number) => "₹".repeat(range);

  const hasActiveFilters = selectedCity !== "All" || selectedCategory !== "All" || selectedPrice !== "All";

  const clearFilters = () => {
    setSelectedCity("All");
    setSelectedCategory("All");
    setSelectedPrice("All");
  };

  return (
    <MobileLayout title="Vendors" showLogo={false}>
      <div className="px-4 py-4 space-y-4">
        {/* Search & Filter Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border h-10 text-sm"
            />
          </div>
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className={cn(
                  "h-10 w-10 shrink-0",
                  hasActiveFilters && "border-primary text-primary"
                )}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-2xl">
              <SheetHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <SheetTitle className="font-heading text-lg">Filters</SheetTitle>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-8">
                      Clear all
                    </Button>
                  )}
                </div>
              </SheetHeader>
              <div className="space-y-4 pb-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">City</label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Cities</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Budget</label>
                  <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Budgets</SelectItem>
                      <SelectItem value="1">₹ - Budget</SelectItem>
                      <SelectItem value="2">₹₹ - Moderate</SelectItem>
                      <SelectItem value="3">₹₹₹ - Premium</SelectItem>
                      <SelectItem value="4">₹₹₹₹ - Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => setFiltersOpen(false)}
                >
                  Show {filteredVendors.length} Results
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters Pills */}
        {hasActiveFilters && (
          <div className="flex gap-2 flex-wrap">
            {selectedCity !== "All" && (
              <Badge variant="secondary" className="gap-1 pr-1">
                {selectedCity}
                <button onClick={() => setSelectedCity("All")} className="ml-1 p-0.5 hover:bg-muted rounded-full">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedCategory !== "All" && (
              <Badge variant="secondary" className="gap-1 pr-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")} className="ml-1 p-0.5 hover:bg-muted rounded-full">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedPrice !== "All" && (
              <Badge variant="secondary" className="gap-1 pr-1">
                {"₹".repeat(Number(selectedPrice))}
                <button onClick={() => setSelectedPrice("All")} className="ml-1 p-0.5 hover:bg-muted rounded-full">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {filteredVendors.length} vendors
          </p>
          <Badge variant="outline" className="text-xs">
            {vendors.filter((v) => v.shortlisted).length} saved
          </Badge>
        </div>

        {/* Vendor List */}
        <div className="space-y-3">
          {filteredVendors.map((vendor) => (
            <Card
              key={vendor.id}
              className="overflow-hidden bg-card border-border active:scale-[0.99] transition-transform"
            >
              <div className="flex">
                <div className="relative w-28 shrink-0">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover aspect-square"
                  />
                  <Badge className="absolute bottom-2 left-2 bg-background/90 backdrop-blur-sm text-foreground text-[10px] px-1.5 py-0">
                    {vendor.category}
                  </Badge>
                </div>
                <CardContent className="flex-1 p-3">
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <h3 className="font-heading text-sm font-semibold text-foreground line-clamp-1">
                      {vendor.name}
                    </h3>
                    <button
                      onClick={() => toggleShortlist(vendor.id)}
                      className={cn(
                        "p-1 -mr-1 -mt-0.5",
                        vendor.shortlisted ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          vendor.shortlisted && "fill-primary"
                        )}
                      />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-xs font-medium">{vendor.wedScore}</span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                      <MapPin className="h-3 w-3" />
                      {vendor.city}
                    </span>
                    <span className="text-xs text-primary font-medium ml-auto">
                      {getPriceDisplay(vendor.priceRange)}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">
                    {vendor.description}
                  </p>
                  <Button size="sm" className="w-full h-7 text-xs">
                    Contact
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground mb-2">No vendors found</p>
            <Button variant="link" size="sm" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Vendors;
