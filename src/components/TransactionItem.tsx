import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionItemProps {
  type: "spent" | "added";
  shop: string;
  amount: number;
  date: string;
}

const TransactionItem = ({ type, shop, amount, date }: TransactionItemProps) => {
  const isSpent = type === "spent";
  
  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition-colors duration-200">
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-full",
          isSpent ? "bg-destructive/10" : "bg-secondary/10"
        )}>
          {isSpent ? (
            <ArrowDownLeft className="w-4 h-4 text-destructive" />
          ) : (
            <ArrowUpRight className="w-4 h-4 text-secondary" />
          )}
        </div>
        <div>
          <p className="font-medium text-foreground">{shop}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>
      <p className={cn(
        "font-semibold",
        isSpent ? "text-destructive" : "text-secondary"
      )}>
        {isSpent ? "-" : "+"}{amount}
      </p>
    </div>
  );
};

export default TransactionItem;
