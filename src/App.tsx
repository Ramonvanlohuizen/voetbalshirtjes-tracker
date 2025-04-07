import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CalendarDays, TrendingUp, BarChart3 } from "lucide-react";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    buyDate: "",
    sellDate: "",
    source: "",
    size: "",
    buyPrice: "",
    sellPrice: "",
  });

  const [items, setItems] = useState([]);

  const handleAdd = () => {
    const buy = parseFloat(form.buyPrice);
    const sell = parseFloat(form.sellPrice);
    const winst = sell - buy;
    const roi = buy ? (winst / buy) * 100 : 0;

    setItems([
      ...items,
      {
        id: uuidv4(),
        name: form.name,
        buyDate: form.buyDate,
        sellDate: form.sellDate,
        source: form.source,
        size: form.size,
        buyPrice: buy,
        sellPrice: sell,
        winst,
        roi,
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
    });
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const today = new Date().toISOString().split("T")[0];
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const soldToday = items.filter((i) => i.sellDate === today);
  const soldWeek = items.filter((i) => {
    const d = new Date(i.sellDate);
    return d >= weekStart && d <= new Date();
  });
  const soldMonth = items.filter((i) => {
    const d = new Date(i.sellDate);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const profitToday = soldToday.reduce((sum, i) => sum + i.winst, 0);
  const profitWeek = soldWeek.reduce((sum, i) => sum + i.winst, 0);
  const profitMonth = soldMonth.reduce((sum, i) => sum + i.winst, 0);

  const totalWinst = items.reduce((sum, item) => sum + item.winst, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans">
      <h1 className="text-2xl font-bold text-center text-orange-600 mb-6">
        Voetbaltracker
      </h1>

      {/* Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-fade-in">
        <div className="bg-black text-white p-4 rounded-xl shadow-md border border-white">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="text-orange-400 w-5 h-5" />
            <p className="text-sm text-gray-300">Verkocht vandaag</p>
          </div>
          <p className="text-2xl font-bold">{soldToday.length}</p>
          <p className="text-sm text-orange-400">Winst: €{profitToday.toFixed(2)}</p>
        </div>
        <div className="bg-black text-white p-4 rounded-xl shadow-md border border-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-orange-400 w-5 h-5" />
            <p className="text-sm text-gray-300">Deze week</p>
          </div>
          <p className="text-2xl font-bold">{soldWeek.length}</p>
          <p className="text-sm text-orange-400">Winst: €{profitWeek.toFixed(2)}</p>
        </div>
        <div className="bg-black text-white p-4 rounded-xl shadow-md border border-white">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="text-orange-400 w-5 h-5" />
            <p className="text-sm text-gray-300">Deze maand</p>
          </div>
          <p className="text-2xl font-bold">{soldMonth.length}</p>
          <p className="text-sm text-orange-400">Winst: €{profitMonth.toFixed(2)}</p>
        </div>
      </div>

      {/* Form */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          className="border p-2"
          placeholder="Shirtnaam"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="date"
          className="border p-2"
          value={form.buyDate}
          onChange={(e) => setForm({ ...form, buyDate: e.target.value })}
        />
        <input
          type="date"
          className="border p-2"
          value={form.sellDate}
          onChange={(e) => setForm({ ...form, sellDate: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Leverancier"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Maat"
          value={form.size}
          onChange={(e) => setForm({ ...form, size: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Aankoopprijs (€)"
          value={form.buyPrice}
          onChange={(e) => setForm({ ...form, buyPrice: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Verkoopprijs (€)"
          value={form.sellPrice}
          onChange={(e) => setForm({ ...form, sellPrice: e.target.value })}
        />
        <button
          className="bg-green-600 text-white p-2 rounded"
          onClick={handleAdd}
        >
          Toevoegen
        </button>
      </div>

      {/* Overzicht */}
      <h2 className="text-lg font-semibold mb-2">Overzicht</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded flex justify-between items-start"
          >
            <div>
              <p className="font-bold">
                {item.name} ({item.size})
              </p>
              <p>
                Inkoop: €{item.buyPrice} – Verkoop: €{item.sellPrice}
              </p>
              <p>
                Winst: €{item.winst.toFixed(2)} – ROI: {item.roi.toFixed(1)}%
              </p>
              <p>
                Gekocht: {item.buyDate} – Verkocht: {item.sellDate}
              </p>
              <p>Leverancier: {item.source}</p>
            </div>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleDelete(item.id)}
            >
              Verwijder
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center font-semibold text-green-700">
        Totale winst: €{totalWinst.toFixed(2)}
      </div>
    </div>
  );
}
