import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { galleryItems, GalleryItem } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

const styles = ["All", "Traditional", "Modern", "Destination", "Romantic"];

const Gallery = () => {
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => selectedStyle === "All" || item.style === selectedStyle
  );

  return (
    <MobileLayout title="Gallery" showLogo={false}>
      <div className="px-4 py-4 space-y-4">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-1">
            Real Weddings
          </h2>
          <p className="text-xs text-muted-foreground">
            Get inspired by beautiful moments
          </p>
        </div>

        {/* Style Filters - Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          {styles.map((style) => (
            <Button
              key={style}
              variant={selectedStyle === style ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStyle(style)}
              className="shrink-0 h-8 text-xs px-4"
            >
              {style}
            </Button>
          ))}
        </div>

        {/* Gallery Grid - 2 columns for mobile */}
        <div className="grid grid-cols-2 gap-2">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden cursor-pointer border-border active:scale-[0.98] transition-transform"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="font-heading text-xs font-medium text-primary-foreground line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-primary-foreground/70 line-clamp-1">
                    {item.vendorName}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="absolute top-2 right-2 text-[10px] px-1.5 py-0 bg-background/80 backdrop-blur-sm"
                >
                  {item.style}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No weddings found</p>
          </div>
        )}

        {/* Lightbox Dialog - Full screen on mobile */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-full w-full h-full max-h-full p-0 m-0 border-0 rounded-none">
            <DialogHeader className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedItem(null)}
                className="bg-background/80 backdrop-blur-sm hover:bg-background h-9 w-9"
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogHeader>
            {selectedItem && (
              <div className="h-full flex flex-col">
                <div className="flex-1 relative">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-background safe-area-bottom">
                  <DialogTitle className="font-heading text-lg mb-1">
                    {selectedItem.title}
                  </DialogTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{selectedItem.style}</Badge>
                    <span className="text-xs text-muted-foreground">
                      by {selectedItem.vendorName}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MobileLayout>
  );
};

export default Gallery;
