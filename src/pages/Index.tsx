import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ObjectCard, { ObjectItem } from "@/components/ObjectCard";
import ObjectDetailsModal from "@/components/ObjectDetailsModal";
import UploadObjectModal from "@/components/UploadObjectModal";
import ContactModal from "@/components/ContactModal";

// Mock data - will be replaced with Supabase data later
const mockObjects: ObjectItem[] = [
  {
    id: "1",
    title: "Trapano Elettrico",
    description: "Trapano a batteria da 18V con pacco batterie. Perfetto per progetti fai-da-te.",
    category: "Attrezzi",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop",
    owner: "Sarah Johnson",
    available: true,
    status: "approved",
  },
  {
    id: "2",
    title: "Rastrello da Giardino",
    description: "Rastrello da giardino resistente, ottimo per la pulizia delle foglie autunnali.",
    category: "Giardino",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop",
    owner: "Mike Chen",
    available: true,
    status: "approved",
  },
  {
    id: "3",
    title: "Tenda da Campeggio",
    description: "Tenda da campeggio per 4 persone, impermeabile e facile da montare.",
    category: "Attrezzatura Sportiva",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&auto=format&fit=crop",
    owner: "Emma Davis",
    available: false,
    status: "approved",
  },
  {
    id: "4",
    title: "Impastatrice Planetaria",
    description: "Impastatrice professionale con accessori multipli. Perfetta per dolci.",
    category: "Cucina",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&auto=format&fit=crop",
    owner: "David Martinez",
    available: true,
    status: "approved",
  },
  {
    id: "5",
    title: "Collezione Libri di Fotografia",
    description: "Set di 5 libri di fotografia National Geographic.",
    category: "Libri",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop",
    owner: "Lisa Anderson",
    available: true,
    status: "approved",
  },
  {
    id: "6",
    title: "Idropulitrice",
    description: "Idropulitrice elettrica per la pulizia di vialetti e patios.",
    category: "Attrezzi",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop",
    owner: "Tom Wilson",
    available: true,
    status: "approved",
  },
];

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<ObjectItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [items, setItems] = useState<ObjectItem[]>(mockObjects);

  useEffect(() => {
    // Load approved items from localStorage
    const approvedItems = JSON.parse(localStorage.getItem("approvedItems") || "[]");
    setItems([...mockObjects, ...approvedItems]);
  }, []);

  // Filter only approved items
  const approvedItems = items.filter(item => item.status === "approved");

  const handleCardClick = (item: ObjectItem) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  const handleContactClick = () => {
    setIsDetailsOpen(false);
    setIsContactOpen(true);
  };

  const handleContactClose = () => {
    setIsContactOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onUploadClick={() => setIsUploadOpen(true)} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Oggetti della Comunità
          </h2>
          <p className="text-muted-foreground">
            Condividi e prendi in prestito oggetti con i tuoi vicini
          </p>
        </div>

        {approvedItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nessun oggetto disponibile al momento</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {approvedItems.map((item) => (
              <ObjectCard 
                key={item.id} 
                item={item} 
                onClick={() => handleCardClick(item)} 
              />
            ))}
          </div>
        )}
      </main>

      <ObjectDetailsModal
        item={selectedItem}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedItem(null);
        }}
        onContactClick={handleContactClick}
      />

      <UploadObjectModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />

      <ContactModal
        item={selectedItem}
        isOpen={isContactOpen}
        onClose={handleContactClose}
      />
    </div>
  );
};

export default Index;
