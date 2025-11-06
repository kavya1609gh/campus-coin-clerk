import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenCard from "@/components/TokenCard";
import ShopCard from "@/components/ShopCard";
import TransactionItem from "@/components/TransactionItem";
import { Wallet, Store, Clock, Shield, Zap, QrCode } from "lucide-react";
import heroImage from "@/assets/hero-food-animated.jpg";
import { Link } from "react-router-dom";

const Index = () => {
  // Mock data
  const mockShops = [
    { name: "Main Cafe", category: "Meals & Beverages", rating: 4.8 },
    { name: "Quick Bites", category: "Fast Food", rating: 4.5 },
    { name: "Fresh Corner", category: "Salads & Juices", rating: 4.7 },
    { name: "Coffee House", category: "Coffee & Snacks", rating: 4.9 },
  ];

  const mockTransactions = [
    { type: "spent" as const, shop: "Main Cafe", amount: 50, date: "Today, 2:30 PM" },
    { type: "spent" as const, shop: "Coffee House", amount: 20, date: "Today, 10:15 AM" },
    { type: "added" as const, shop: "Wallet Top-up", amount: 200, date: "Yesterday, 9:00 AM" },
    { type: "spent" as const, shop: "Quick Bites", amount: 35, date: "Yesterday, 1:45 PM" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="College cafeteria with students" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              EAT EASY
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Say goodbye to billing issues. Pay instantly with digital tokens across all cafeteria shops.
            </p>
            <div className="flex gap-4">
              <Link to="/menu">
                <Button variant="hero" size="lg" className="text-base">
                  View Menu
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="text-base">
                  Login / Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why EAT EASY?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 shadow-card hover:shadow-glow transition-all duration-300">
              <div className="bg-gradient-primary p-3 rounded-lg w-fit mb-4">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Payments</h3>
              <p className="text-muted-foreground">
                No more waiting in queues. Pay with a tap and tokens are instantly transferred to shops.
              </p>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-glow transition-all duration-300">
              <div className="bg-gradient-secondary p-3 rounded-lg w-fit mb-4">
                <Shield className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
              <p className="text-muted-foreground">
                Your transactions are encrypted and secure. Track every token spent with complete transparency.
              </p>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-glow transition-all duration-300">
              <div className="bg-gradient-primary p-3 rounded-lg w-fit mb-4">
                <QrCode className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
              <p className="text-muted-foreground">
                Scan QR codes at any shop to pay. Simple, fast, and hassle-free for everyone.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="student" className="gap-2">
                <Wallet className="w-4 h-4" />
                Student Portal
              </TabsTrigger>
              <TabsTrigger value="shop" className="gap-2">
                <Store className="w-4 h-4" />
                Shop Interface
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <TokenCard balance={275} recentSpent={105} />
                  <Card className="p-6 shadow-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">Quick Actions</h3>
                    </div>
                    <div className="space-y-3">
                      <Button className="w-full" variant="token">
                        Add Tokens
                      </Button>
                      <Button className="w-full" variant="outline">
                        View All Transactions
                      </Button>
                    </div>
                  </Card>
                </div>

                <Card className="p-6 shadow-card">
                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold">Recent Activity</h3>
                  </div>
                  <div className="space-y-2">
                    {mockTransactions.map((transaction, index) => (
                      <TransactionItem key={index} {...transaction} />
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="shop" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockShops.map((shop, index) => (
                  <ShopCard key={index} {...shop} />
                ))}
              </div>
              <Card className="p-8 text-center shadow-card">
                <Store className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Shop Owner Portal</h3>
                <p className="text-muted-foreground mb-6">
                  Accept tokens, view transactions, and manage your digital storefront seamlessly.
                </p>
                <Button variant="hero" size="lg">
                  Register Your Shop
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Ready to go cashless?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of students already using EAT EASY for hassle-free cafeteria payments.
          </p>
          <Link to="/auth">
            <Button variant="secondary" size="lg" className="text-base shadow-lg">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 EAT EASY. Making campus dining easier, one token at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
