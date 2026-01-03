import { vendors } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function VendorPreview() {
  // Show only first 3 vendors in preview
  const previewVendors = vendors.slice(0, 3);

  const getPriceDisplay = (range: number) => {
    return "₹".repeat(range);
  };

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-3 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading text-lg">Top Vendors</CardTitle>
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            {vendors.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4">
        {previewVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="flex gap-3 p-2.5 rounded-lg bg-secondary/30 active:bg-secondary/50 transition-colors"
          >
            <img
              src={vendor.image}
              alt={vendor.name}
              className="w-16 h-16 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0 py-0.5">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {vendor.name}
                </h4>
                <button className="shrink-0 p-1 text-muted-foreground active:text-primary">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {vendor.category}
                </Badge>
                <span className="text-[10px] text-muted-foreground">{vendor.city}</span>
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="text-xs font-medium text-foreground">
                    {vendor.wedScore}
                  </span>
                </div>
                <span className="text-xs text-primary font-medium">
                  {getPriceDisplay(vendor.priceRange)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* View All Link */}
        <Link 
          to="/vendors"
          className="flex items-center justify-center gap-1 text-xs text-primary font-medium pt-1 active:opacity-70"
        >
          View all vendors
          <ChevronRight className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}
