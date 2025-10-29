import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { ObjectItem } from "@/components/ObjectCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Check, X, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [pendingItems, setPendingItems] = useState<ObjectItem[]>([]);

  useEffect(() => {
    // Check if admin is authenticated (using localStorage for demo)
    // WARNING: This is not secure for production - use proper backend authentication
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth === "authenticated") {
      setIsAuthenticated(true);
      loadPendingItems();
    }
  }, []);

  const loadPendingItems = () => {
    const items = JSON.parse(localStorage.getItem("pendingItems") || "[]");
    setPendingItems(items);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo password - in production, use proper backend authentication
    if (password === "admin123") {
      localStorage.setItem("adminAuth", "authenticated");
      setIsAuthenticated(true);
      loadPendingItems();
      toast.success("Accesso effettuato");
    } else {
      toast.error("Password errata");
    }
  };

  const handleApprove = (item: ObjectItem) => {
    // Remove from pending
    const remaining = pendingItems.filter(i => i.id !== item.id);
    localStorage.setItem("pendingItems", JSON.stringify(remaining));
    
    // Add to approved
    const approved = JSON.parse(localStorage.getItem("approvedItems") || "[]");
    approved.push({ ...item, status: "approved" });
    localStorage.setItem("approvedItems", JSON.stringify(approved));
    
    setPendingItems(remaining);
    toast.success("Oggetto approvato!");
  };

  const handleReject = (item: ObjectItem) => {
    // Remove from pending
    const remaining = pendingItems.filter(i => i.id !== item.id);
    localStorage.setItem("pendingItems", JSON.stringify(remaining));
    
    setPendingItems(remaining);
    toast.success("Oggetto rifiutato");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Lock className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Pannello Admin</DialogTitle>
            <DialogDescription className="text-center">
              Inserisci la password per accedere
            </DialogDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Inserisci password admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Accedi
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <p className="text-xs text-muted-foreground text-center">
              Demo password: admin123
            </p>
            <Button variant="outline" onClick={() => navigate("/")} className="w-full">
              Torna alla Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onUploadClick={() => {}} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Pannello Amministrazione
          </h2>
          <p className="text-muted-foreground">
            Approva o rifiuta gli oggetti in attesa
          </p>
        </div>

        {pendingItems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Nessun oggetto in attesa di approvazione</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pendingItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Condiviso da <span className="font-medium text-foreground">{item.owner}</span>
                      </p>
                    </div>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 gap-2"
                    onClick={() => handleReject(item)}
                  >
                    <X className="h-4 w-4" />
                    Rifiuta
                  </Button>
                  <Button 
                    className="flex-1 gap-2"
                    onClick={() => handleApprove(item)}
                  >
                    <Check className="h-4 w-4" />
                    Approva
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
