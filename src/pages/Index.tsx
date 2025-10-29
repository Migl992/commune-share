import { useState } from "react";
import Header from "@/components/Header";
import ObjectCard, { ObjectItem } from "@/components/ObjectCard";
import ObjectDetailsModal from "@/components/ObjectDetailsModal";
import UploadObjectModal from "@/components/UploadObjectModal";
import ContactModal from "@/components/ContactModal";

// Mock data - will be replaced with Supabase data later
const mockObjects: ObjectItem[] = [
  {
    id: "1",
    title: "Electric Drill",
    description: "18V cordless drill with battery pack. Perfect for home DIY projects.",
    category: "Tools",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop",
    owner: "Sarah Johnson",
    available: true,
  },
  {
    id: "2",
    title: "Garden Rake",
    description: "Heavy-duty garden rake, great for autumn leaf cleanup.",
    category: "Garden",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop",
    owner: "Mike Chen",
    available: true,
  },
  {
    id: "3",
    title: "Camping Tent",
    description: "4-person camping tent, waterproof and easy to set up.",
    category: "Sports Equipment",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&auto=format&fit=crop",
    owner: "Emma Davis",
    available: false,
  },
  {
    id: "4",
    title: "Stand Mixer",
    description: "Professional stand mixer with multiple attachments. Perfect for baking.",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&auto=format&fit=crop",
    owner: "David Martinez",
    available: true,
  },
  {
    id: "5",
    title: "Photography Book Collection",
    description: "Set of 5 National Geographic photography books.",
    category: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop",
    owner: "Lisa Anderson",
    available: true,
  },
  {
    id: "6",
    title: "Pressure Washer",
    description: "Electric pressure washer for cleaning driveways and patios.",
    category: "Tools",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop",
    owner: "Tom Wilson",
    available: true,
  },
];

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<ObjectItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

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
            Community Items
          </h2>
          <p className="text-muted-foreground">
            Share and borrow items with your neighbors
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockObjects.map((item) => (
            <ObjectCard 
              key={item.id} 
              item={item} 
              onClick={() => handleCardClick(item)} 
            />
          ))}
        </div>
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
