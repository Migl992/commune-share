import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ObjectItem } from "./ObjectCard";

interface ObjectDetailsModalProps {
  item: ObjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

const ObjectDetailsModal = ({ item, isOpen, onClose, onContactClick }: ObjectDetailsModalProps) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-2xl">{item.title}</DialogTitle>
            <Badge variant={item.available ? "default" : "secondary"}>
              {item.available ? "Disponibile" : "In Prestito"}
            </Badge>
          </div>
          <DialogDescription className="text-base">
            <span className="text-muted-foreground">Condiviso da </span>
            <span className="font-medium text-foreground">{item.owner}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="aspect-video overflow-hidden rounded-lg bg-muted">
            <img 
              src={item.image} 
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div>
            <h4 className="mb-2 font-semibold text-foreground">Descrizione</h4>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
          
          <div>
            <h4 className="mb-2 font-semibold text-foreground">Categoria</h4>
            <Badge variant="outline">{item.category}</Badge>
          </div>
          
          {item.available && (
            <Button 
              onClick={onContactClick} 
              className="w-full"
            >
              Richiedi in Prestito
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ObjectDetailsModal;
