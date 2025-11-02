import { Card } from "@/components/ui/card";
import { Coins, TrendingUp } from "lucide-react";

interface TokenCardProps {
  balance: number;
  recentSpent: number;
}

const TokenCard = ({ balance, recentSpent }: TokenCardProps) => {
  return (
    <Card className="p-6 bg-gradient-primary border-0 shadow-glow animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-primary-foreground/80 text-sm font-medium mb-1">Available Balance</p>
          <h2 className="text-4xl font-bold text-primary-foreground flex items-center gap-2">
            <Coins className="w-8 h-8" />
            {balance}
          </h2>
          <p className="text-primary-foreground/90 text-xs mt-1">tokens</p>
        </div>
        <div className="bg-primary-foreground/10 p-3 rounded-lg backdrop-blur-sm">
          <TrendingUp className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
      <div className="pt-4 border-t border-primary-foreground/20">
        <p className="text-primary-foreground/70 text-xs">Spent this week</p>
        <p className="text-primary-foreground font-semibold text-lg">{recentSpent} tokens</p>
      </div>
    </Card>
  );
};

export default TokenCard;
