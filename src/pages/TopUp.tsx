import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Wallet, CreditCard } from "lucide-react";

const TopUp = () => {
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
      }
    };

    checkAuth();
  }, [navigate]);

  const quickAmounts = [100, 200, 500, 1000];

  const handleTopUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Top-up successful!",
        description: `₹${numAmount} tokens have been added to your wallet.`,
      });
      setAmount("");
      setProcessing(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
        Top Up Tokens
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-8 shadow-glow">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-primary p-3 rounded-lg">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-2xl font-bold">₹275</p>
            </div>
          </div>

          <form onSubmit={handleTopUp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Enter Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Quick Select</Label>
              <div className="grid grid-cols-2 gap-3">
                {quickAmounts.map((amt) => (
                  <Button
                    key={amt}
                    type="button"
                    variant="outline"
                    onClick={() => setAmount(amt.toString())}
                  >
                    ₹{amt}
                  </Button>
                ))}
              </div>
            </div>

            <Button type="submit" disabled={processing} variant="hero" className="w-full">
              {processing ? "Processing..." : "Proceed to Payment"}
            </Button>
          </form>
        </Card>

        <Card className="p-8 shadow-glow">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-secondary p-3 rounded-lg">
              <CreditCard className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-bold">Payment Methods</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">UPay</p>
                  <p className="text-sm text-muted-foreground">Instant payment via UPay</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-muted-foreground">Secure card payment</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                ✓ Instant token credit<br />
                ✓ Secure payment processing<br />
                ✓ 24/7 support available
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TopUp;
