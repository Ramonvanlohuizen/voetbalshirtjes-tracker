import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { v4 as uuidv4 } from "uuid";
import { CalendarDays, TrendingUp, BarChart3 } from "lucide-react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    buyDate: "",
    sellDate: "",
    source: "",
    size: "",
    buyPrice: "",
    sellPrice: "",
    photo: null,
  });

  const correctPassword = "voetbal2025";

  const handleLogin = () => {
    if (password === correctPassword) setLoggedIn(true);
  };

  const handleAddItem = () => {
    const buy = parseFloat(form.buyPrice);
    const sell = parseFloat(form.sellPrice);
    const winst = sell - buy;
    const roi = buy ? ((winst / buy) * 100).toFixed(1) : 0;

    setItems([
      ...items,
      {
        id: uuidv4(),
        ...form,
        winst,
        roi,
        photoUrl: form.photo ? URL.createObjectURL(form.photo) : null,
      },
    ]);

    setForm({
      name: "",
      buyDate: "",
      sellDate: "",
      source: "",
      size: "",
      buyPrice: "",
      sellPrice: "",
      photo: null,
    });
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const today = new Date().toISOString().split("T")[0];
  const currentWeekStart = new Date();
  currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const soldTodayItems = items.filter(i => i.sellDate === today);
  const soldWeekItems = items.filter(i => {
    const d = new Date(i.sellDate);
    return d >= currentWeekStart && d <= new Date();
  });
  const soldMonthItems = items.filter(i => {
    const d = new Date(i.sellDate);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const soldToday = soldTodayItems.length;
  const soldThisWeek = soldWeekItems.length;
  const soldThisMonth = soldMonthItems.length;

  const profitToday = soldTodayItems.reduce((sum, i) => sum + i.winst, 0);
  const profitThisWeek = soldWeekItems.reduce((sum, i) => sum + i.winst, 0);
  const profitThisMonth = soldMonthItems.reduce((sum, i) => sum + i.winst, 0);

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6 w-full max-w-sm">
          <Label>Wachtwoord</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4" />
          <Button onClick={handleLogin} className="w-full">Inloggen</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Voetbalshirtjes Tracker</h1>
      <Tabs defaultValue="overzicht">
        <TabsList>
          <TabsTrigger value="overzicht">Dashboard</TabsTrigger>
          <TabsTrigger value="toevoegen">Nieuw Shirt</TabsTrigger>
        </TabsList>

        <TabsContent value="overzicht">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <Card className="bg-black text-white border border-white shadow-md animate-fade-in">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarDays className="w-5 h-5 text-orange-400" />
                  <p className="text-sm text-gray-300">Verkocht vandaag</p>
                </div>
                <p className="text-2xl font-bold">{soldToday}</p>
                <p className="text-sm text-orange-400 font-semibold">Winst: €{profitToday.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card className="bg-black text-white border border-white shadow-md animate-fade-in">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  <p className="text-sm text-gray-300">Verkocht deze week</p>
                </div>
                <p className="text-2xl font-bold">{soldThisWeek}</p>
                <p className="text-sm text-orange-400 font-semibold">Winst: €{profitThisWeek.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card className="bg-black text-white border border-white shadow-md animate-fade-in">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-orange-400" />
                  <p className="text-sm text-gray-300">Verkocht deze maand</p>
                </div>
                <p className="text-2xl font-bold">{soldThisMonth}</p>
                <p className="text-sm text-orange-400 font-semibold">Winst: €{profitThisMonth.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {item.photoUrl && <img src={item.photoUrl} alt="shirt" className="w-20 h-20 object-cover rounded" />}
                    <div className="flex-1">
                      <p className="font-bold">{item.name} ({item.size})</p>
                      <p>Inkoop: €{item.buyPrice} – Verkoop: €{item.sellPrice}</p>
                      <p>Winst: €{item.winst.toFixed(2)} – ROI: {item.roi}%</p>
                      <p>Gekocht: {item.buyDate} – Verkocht: {item.sellDate}</p>
                      <p>Leverancier: {item.source}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button onClick={() => handleDelete(item.id)} variant="destructive">Verwijder</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="toevoegen">
          <div className="grid gap-4 mt-4">
            <Input placeholder="Shirt naam" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input type="date" value={form.buyDate} onChange={(e) => setForm({ ...form, buyDate: e.target.value })} />
            <Input type="date" value={form.sellDate} onChange={(e) => setForm({ ...form, sellDate: e.target.value })} />
            <Input placeholder="Leverancier" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} />
            <Input placeholder="Maat" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} />
            <Input placeholder="Aankoopprijs (€)" value={form.buyPrice} onChange={(e) => setForm({ ...form, buyPrice: e.target.value })} />
            <Input placeholder="Verkoopprijs (€)" value={form.sellPrice} onChange={(e) => setForm({ ...form, sellPrice: e.target.value })} />
            <Input type="file" onChange={(e) => setForm({ ...form, photo: e.target.files?.[0] || null })} />
            <Button onClick={handleAddItem}>Toevoegen</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
