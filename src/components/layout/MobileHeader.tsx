import { Heart } from "lucide-react";

interface MobileHeaderProps {
  title?: string;
  showLogo?: boolean;
}

export function MobileHeader({ title, showLogo = true }: MobileHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border safe-area-top">
      <div className="flex items-center justify-center h-14 px-4">
        {showLogo ? (
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary fill-primary" />
            <span className="font-heading text-xl font-semibold text-foreground">
              WedPlan
            </span>
          </div>
        ) : (
          <h1 className="font-heading text-xl font-semibold text-foreground">
            {title}
          </h1>
        )}
      </div>
    </header>
  );
}
