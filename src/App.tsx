import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Billing from "./pages/Billing";
import OrderReceipt from "./pages/OrderReceipt";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import TopUp from "./pages/TopUp";
import Transactions from "./pages/Transactions";
import ProtectedLayout from "./components/ProtectedLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected routes with sidebar */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/receipt" element={<OrderReceipt />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/topup" element={<TopUp />} />
            <Route path="/transactions" element={<Transactions />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
