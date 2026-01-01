import { vendors } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VendorPreview() {
  // Show only first 3 vendors in preview
  const previewVendors = vendors.slice(0, 3);

  const getPriceDisplay = (range: number) => {
    return "₹".repeat(range);
  };

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading text-2xl">Top Vendors</CardTitle>
          <Badge variant="secondary" className="text-sm">
            {vendors.length} vendors
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {previewVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="flex gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <img
              src={vendor.image}
              alt={vendor.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-medium text-foreground truncate">
                  {vendor.name}
                </h4>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 h-8 w-8 text-muted-foreground hover:text-primary"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {vendor.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{vendor.city}</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {vendor.wedScore}
                  </span>
                </div>
                <span className="text-sm text-primary font-medium">
                  {getPriceDisplay(vendor.priceRange)}
                </span>
              </div>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full mt-2">
          View All Vendors
        </Button>
      </CardContent>
    </Card>
  );
}
