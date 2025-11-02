import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, Star } from "lucide-react";

interface ShopCardProps {
  name: string;
  category: string;
  rating: number;
  image?: string;
}

const ShopCard = ({ name, category, rating }: ShopCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div className="h-32 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <Store className="w-12 h-12 text-primary" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{category}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-foreground">{rating}</span>
          </div>
          <Button size="sm" variant="ghost">View Menu</Button>
        </div>
      </div>
    </Card>
  );
};

export default ShopCard;
