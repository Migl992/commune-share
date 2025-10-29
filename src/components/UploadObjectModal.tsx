import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

interface UploadObjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  "Attrezzi",
  "Libri",
  "Attrezzatura Sportiva",
  "Cucina",
  "Elettronica",
  "Giardino",
  "Altro"
];

const UploadObjectModal = ({ isOpen, onClose }: UploadObjectModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    owner: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("L'immagine deve essere inferiore a 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.owner) {
      toast.error("Compila tutti i campi obbligatori");
      return;
    }

    if (!imagePreview) {
      toast.error("Carica un'immagine");
      return;
    }
    
    // Store pending items in localStorage
    const pendingItems = JSON.parse(localStorage.getItem("pendingItems") || "[]");
    const newItem = {
      id: Date.now().toString(),
      ...formData,
      image: imagePreview,
      available: true,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    pendingItems.push(newItem);
    localStorage.setItem("pendingItems", JSON.stringify(pendingItems));
    
    toast.success("Oggetto inviato per approvazione!");
    onClose();
    setFormData({ title: "", description: "", category: "", owner: "" });
    setImagePreview("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Condividi un Oggetto</DialogTitle>
          <DialogDescription>
            Aggiungi un oggetto da condividere con la comunità locale
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Immagine *</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {imagePreview ? (
              <div className="relative aspect-video overflow-hidden rounded-lg border border-input">
                <img
                  src={imagePreview}
                  alt="Anteprima"
                  className="h-full w-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => {
                    setImagePreview("");
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="w-full h-32 border-dashed"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Clicca per caricare un'immagine</span>
                </div>
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Nome Oggetto *</Label>
            <Input
              id="title"
              placeholder="Trapano elettrico"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Categoria *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Seleziona una categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrizione *</Label>
            <Textarea
              id="description"
              placeholder="Descrivi il tuo oggetto..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="owner">Il Tuo Nome *</Label>
            <Input
              id="owner"
              placeholder="Mario Rossi"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
            />
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annulla
            </Button>
            <Button type="submit" className="flex-1">
              Condividi Oggetto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadObjectModal;
