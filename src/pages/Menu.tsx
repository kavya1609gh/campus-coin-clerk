import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Menu = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<MenuItem[]>([]);

  const menuItems: MenuItem[] = [
    // Main Course
    { id: 1, name: "Classic Burger", price: 45, description: "Delicious patty with lettuce, tomato, and our special sauce", category: "main", image: "🍔" },
    { id: 2, name: "Cheese Pizza", price: 60, description: "Wood-fired pizza with mozzarella and fresh basil", category: "main", image: "🍕" },
    { id: 3, name: "Chicken Sandwich", price: 50, description: "Grilled chicken breast with avocado and mayo", category: "main", image: "🥪" },
    { id: 4, name: "Veggie Wrap", price: 40, description: "Fresh vegetables wrapped in whole wheat tortilla", category: "main", image: "🌯" },
    
    // Snacks
    { id: 5, name: "French Fries", price: 25, description: "Crispy golden fries with ketchup", category: "snacks", image: "🍟" },
    { id: 6, name: "Nachos", price: 35, description: "Tortilla chips with cheese sauce and jalapeños", category: "snacks", image: "🧀" },
    { id: 7, name: "Spring Rolls", price: 30, description: "Crispy vegetable spring rolls with sweet chili sauce", category: "snacks", image: "🥟" },
    
    // Beverages
    { id: 8, name: "Coffee", price: 20, description: "Freshly brewed espresso", category: "beverages", image: "☕" },
    { id: 9, name: "Iced Tea", price: 15, description: "Refreshing lemon iced tea", category: "beverages", image: "🧃" },
    { id: 10, name: "Smoothie", price: 35, description: "Mixed berry smoothie with yogurt", category: "beverages", image: "🥤" },
    
    // Desserts
    { id: 11, name: "Ice Cream", price: 30, description: "Vanilla ice cream with chocolate sauce", category: "desserts", image: "🍨" },
    { id: 12, name: "Brownie", price: 25, description: "Warm chocolate brownie with nuts", category: "desserts", image: "🍰" },
  ];

  const addToCart = (item: MenuItem) => {
    setCart([...cart, item]);
    toast.success(`${item.name} added to cart`);
  };

  const getTotalTokens = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/billing", { state: { cart, total: getTotalTokens() } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">EAT EASY</h1>
              <p className="text-sm text-muted-foreground">Cafeteria Menu</p>
            </div>
            <Button onClick={proceedToCheckout} className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              Cart ({cart.length}) - {getTotalTokens()} tokens
            </Button>
          </div>
        </div>
      </header>

      {/* Menu Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="main" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="main">Main Course</TabsTrigger>
              <TabsTrigger value="snacks">Snacks</TabsTrigger>
              <TabsTrigger value="beverages">Beverages</TabsTrigger>
              <TabsTrigger value="desserts">Desserts</TabsTrigger>
            </TabsList>

            {["main", "snacks", "beverages", "desserts"].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <Card key={item.id} className="p-6 shadow-card hover:shadow-glow transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div className="text-5xl">{item.image}</div>
                          <Badge variant="secondary" className="text-base font-bold">
                            {item.price} tokens
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                          {item.description}
                        </p>
                        <Button
                          onClick={() => addToCart(item)}
                          className="w-full gap-2"
                          variant="token"
                        >
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </Button>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Menu;
