import { Button } from "@/components/ui/button";
import { Plus, Shield } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  onUploadClick: () => void;
}

const Header = ({ onUploadClick }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-semibold text-primary-foreground">C</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">CondiVicino</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {!isAdmin && (
              <Button onClick={onUploadClick} className="gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Condividi Oggetto</span>
                <span className="sm:hidden">Condividi</span>
              </Button>
            )}
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate(isAdmin ? "/" : "/admin")}
              title={isAdmin ? "Vai alla Home" : "Pannello Admin"}
            >
              <Shield className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
