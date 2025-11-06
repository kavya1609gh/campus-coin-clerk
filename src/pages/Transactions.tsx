import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Clock, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Transaction = {
  id: string;
  type: "spent" | "added";
  shop: string;
  amount: number;
  date: string;
};

const Transactions = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  // Mock transaction data
  const transactions: Transaction[] = [
    { id: "1", type: "spent", shop: "Main Cafe", amount: 50, date: "Today, 2:30 PM" },
    { id: "2", type: "spent", shop: "Coffee House", amount: 20, date: "Today, 10:15 AM" },
    { id: "3", type: "added", shop: "Wallet Top-up", amount: 200, date: "Yesterday, 9:00 AM" },
    { id: "4", type: "spent", shop: "Quick Bites", amount: 35, date: "Yesterday, 1:45 PM" },
    { id: "5", type: "spent", shop: "Fresh Corner", amount: 45, date: "2 days ago, 3:20 PM" },
    { id: "6", type: "added", shop: "Wallet Top-up", amount: 300, date: "3 days ago, 8:00 AM" },
    { id: "7", type: "spent", shop: "Main Cafe", amount: 65, date: "3 days ago, 1:15 PM" },
    { id: "8", type: "spent", shop: "Coffee House", amount: 25, date: "4 days ago, 11:30 AM" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <Clock className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Transaction History
        </h1>
      </div>

      <Card className="p-6 shadow-glow">
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-full ${
                    transaction.type === "added"
                      ? "bg-green-500/10"
                      : "bg-red-500/10"
                  }`}
                >
                  {transaction.type === "added" ? (
                    <ArrowUpCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.shop}</p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`text-lg font-bold ${
                    transaction.type === "added"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "added" ? "+" : "-"}₹{transaction.amount}
                </p>
                <Badge
                  variant={transaction.type === "added" ? "default" : "secondary"}
                  className="mt-1"
                >
                  {transaction.type === "added" ? "Credit" : "Debit"}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {transactions.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No transactions yet</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Transactions;
