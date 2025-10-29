import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HeaderProps {
  onUploadClick: () => void;
}

const Header = ({ onUploadClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-semibold text-primary-foreground">S</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">ShareLocal</h1>
          </div>
          
          <Button onClick={onUploadClick} className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Share Item</span>
            <span className="sm:hidden">Share</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
