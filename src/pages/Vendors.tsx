import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
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
import { Star, Heart, Search, MapPin, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const Vendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>(allVendors);
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-heading text-4xl font-semibold text-foreground mb-2">
            Find Your Perfect Vendors
          </h1>
          <p className="text-muted-foreground">
            Discover top-rated wedding professionals in your city
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-card border-border animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vendors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>

              {/* City Filter */}
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="bg-background border-border">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <SelectValue placeholder="City" />
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

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-background border-border">
                  <Filter className="h-4 w-4 mr-2 text-primary" />
                  <SelectValue placeholder="Category" />
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

              {/* Price Filter */}
              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Budget" />
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
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <p className="text-sm text-muted-foreground">
            Showing {filteredVendors.length} vendors
          </p>
          <div className="flex gap-2">
            <Badge variant="secondary">
              {vendors.filter((v) => v.shortlisted).length} Shortlisted
            </Badge>
          </div>
        </div>

        {/* Vendor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor, index) => (
            <Card
              key={vendor.id}
              className="overflow-hidden bg-card border-border hover:shadow-md transition-shadow animate-fade-in"
              style={{ animationDelay: `${0.1 * (index % 6)}s` }}
            >
              <div className="relative">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background",
                    vendor.shortlisted && "text-primary"
                  )}
                  onClick={() => toggleShortlist(vendor.id)}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5",
                      vendor.shortlisted && "fill-primary"
                    )}
                  />
                </Button>
                <Badge className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm text-foreground">
                  {vendor.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {vendor.name}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">{vendor.wedScore}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{vendor.city}</span>
                  <span className="text-primary font-medium ml-auto">
                    {getPriceDisplay(vendor.priceRange)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {vendor.description}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No vendors found matching your criteria.</p>
            <Button
              variant="link"
              onClick={() => {
                setSelectedCity("All");
                setSelectedCategory("All");
                setSelectedPrice("All");
                setSearchQuery("");
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Vendors;
