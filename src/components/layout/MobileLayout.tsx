import { ReactNode } from "react";
import { MobileHeader } from "./MobileHeader";
import { BottomNav } from "./BottomNav";

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  showLogo?: boolean;
}

export function MobileLayout({ children, title, showLogo = true }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MobileHeader title={title} showLogo={showLogo} />
      <main className="flex-1 pt-14 pb-20 overflow-y-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
