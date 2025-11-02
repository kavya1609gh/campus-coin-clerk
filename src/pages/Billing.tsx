import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Wallet, CreditCard, Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const Billing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart = [], total = 0 } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState<"tokens" | "card">("tokens");
  const [isProcessing, setIsProcessing] = useState(false);

  const studentBalance = 275; // Mock balance

  const handlePayment = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      navigate("/menu");
      return;
    }

    if (paymentMethod === "tokens" && studentBalance < total) {
      toast.error("Insufficient token balance");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful! Order placed.");
      navigate("/receipt", { 
        state: { 
          cart, 
          total,
          orderId: `ORD${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          timestamp: new Date().toLocaleString()
        } 
      });
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Cart is Empty</h2>
          <p className="text-muted-foreground mb-6">
            Add items to your cart from the menu to proceed with checkout.
          </p>
          <Button onClick={() => navigate("/menu")}>
            Go to Menu
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/menu")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Order Summary */}
          <Card className="p-6 shadow-card h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.image}</span>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <p className="font-bold">{item.price} tokens</p>
                </div>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{total} tokens</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Service Fee</span>
                <span>0 tokens</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>{total} tokens</span>
              </div>
            </div>
          </Card>

          {/* Payment Method */}
          <div className="space-y-6">
            <Card className="p-6 shadow-card">
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
              
              <div className="space-y-4">
                {/* Token Payment */}
                <div
                  onClick={() => setPaymentMethod("tokens")}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "tokens"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-primary p-2 rounded-lg">
                        <Wallet className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-bold">Pay with Tokens</p>
                        <p className="text-sm text-muted-foreground">
                          Balance: {studentBalance} tokens
                        </p>
                      </div>
                    </div>
                    {paymentMethod === "tokens" && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </div>

                {/* Card Payment */}
                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-secondary p-2 rounded-lg">
                        <CreditCard className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="font-bold">Add Tokens via Card</p>
                        <p className="text-sm text-muted-foreground">
                          Credit/Debit Card
                        </p>
                      </div>
                    </div>
                    {paymentMethod === "card" && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="mt-6 space-y-4 animate-fade-in">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" type="password" />
                    </div>
                  </div>
                </div>
              )}
            </Card>

            <Button
              onClick={handlePayment}
              disabled={isProcessing || (paymentMethod === "tokens" && studentBalance < total)}
              className="w-full h-12 text-lg"
              variant="hero"
            >
              {isProcessing ? "Processing..." : `Pay ${total} Tokens`}
            </Button>

            {paymentMethod === "tokens" && studentBalance < total && (
              <p className="text-destructive text-sm text-center">
                Insufficient balance. Please add more tokens or use a card.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
