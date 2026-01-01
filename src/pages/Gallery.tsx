import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
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
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Real Wedding Showcase
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get inspired by beautiful weddings captured by our featured vendors
          </p>
        </div>

        {/* Style Filters */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {styles.map((style) => (
            <Button
              key={style}
              variant={selectedStyle === style ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStyle(style)}
              className="px-6"
            >
              {style}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              className="group overflow-hidden cursor-pointer border-border animate-fade-in"
              style={{ animationDelay: `${0.1 * (index % 6)}s` }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="font-heading text-lg font-semibold text-primary-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/80">
                    by {item.vendorName}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
                >
                  {item.style}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No weddings found for this style.</p>
          </div>
        )}

        {/* Lightbox Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            <DialogHeader className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedItem(null)}
                className="bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogHeader>
            {selectedItem && (
              <div>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-6">
                  <DialogTitle className="font-heading text-2xl mb-2">
                    {selectedItem.title}
                  </DialogTitle>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{selectedItem.style}</Badge>
                    <span className="text-muted-foreground">
                      by {selectedItem.vendorName}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Gallery;
