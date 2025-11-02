import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Home, Receipt } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OrderReceipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart = [], total = 0, orderId, timestamp } = location.state || {};

  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate("/menu");
    }
  }, [cart, navigate]);

  const receiptDate = timestamp || new Date().toLocaleString();
  const orderNumber = orderId || `ORD${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 shadow-glow animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-primary rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">Your order has been placed successfully</p>
        </div>

        <div className="bg-muted/30 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Order Receipt</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <p className="text-muted-foreground">Order Number</p>
              <p className="font-bold">{orderNumber}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Date & Time</p>
              <p className="font-bold">{receiptDate}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <h3 className="font-bold mb-3">Items Ordered</h3>
            {cart.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.image}</span>
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.price} tokens</span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{total} tokens</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Service Fee</span>
              <span>0 tokens</span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Paid</span>
              <span>{total} tokens</span>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-center">
            <span className="font-bold">Estimated Wait Time:</span> 10-15 minutes
          </p>
          <p className="text-sm text-center text-muted-foreground mt-1">
            You'll receive a notification when your order is ready for pickup
          </p>
        </div>

        <div className="flex gap-4">
          <Button onClick={() => navigate("/menu")} variant="outline" className="flex-1">
            Order Again
          </Button>
          <Button onClick={() => navigate("/")} variant="hero" className="flex-1 gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OrderReceipt;
