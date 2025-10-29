import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ObjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  owner: string;
  available: boolean;
}

interface ObjectCardProps {
  item: ObjectItem;
  onClick: () => void;
}

const ObjectCard = ({ item, onClick }: ObjectCardProps) => {
  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img 
          src={item.image} 
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <Badge variant="secondary">Currently Borrowed</Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1">{item.title}</h3>
          <Badge variant="outline" className="shrink-0 text-xs">
            {item.category}
          </Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </CardContent>
      
      <CardFooter className="px-4 pb-4 pt-0">
        <p className="text-xs text-muted-foreground">
          Shared by <span className="font-medium text-foreground">{item.owner}</span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ObjectCard;
