import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { v4 as uuidv4 } from "uuid";
import { CalendarDays, TrendingUp, BarChart3 } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl font-bold mb-2">Voetbaltracker werkt! ✅</h1>
      <p className="text-lg text-gray-600">Je hebt het geflikt Ramon 🔥</p>
    </div>
  );
}
