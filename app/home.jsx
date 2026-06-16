"use client";

import { useState } from "react";
import {
  Home,
  Users,
  Coins,
  Gavel,
  Megaphone,
  CalendarDays,
  Newspaper,
  BarChart3,
  Plus,
  Mic,
  ArrowUp,
  Sparkles,
  Search,
  PanelLeft,
} from "lucide-react";

// ============================================================
// ChatAI DPRD Sumenep — Beranda (light + minimalis ala Claude)
// Aksen: abu-abu netral yang menyatu dengan latar (stone)
// Stack: Next.js App Router + Tailwind CSS + lucide-react
// ============================================================

const NAV_PRIMARY = [
  { label: "Beranda", icon: Home, active: true },
  { label: "Anggota DPRD", icon: Users },
  { label: "APBD", icon: Coins },
  { label: "Perda", icon: Gavel },
  { label: "Aspirasi", icon: Megaphone },
  { label: "Reses", icon: CalendarDays },
];

const NAV_SECONDARY = [
  { label: "Berita", icon: Newspaper },
  { label: "Statistik", icon: BarChart3 },
];

export default function ChatAIHome({ userName = "" }) {
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const greeting = getGreeting();

  function handleSend() {
    const text = query.trim();
    if (!text) return;
    // TODO: arahkan ke halaman chat / panggil API RAG Anda
    // router.push(`/chat?q=${encodeURIComponent(text)}`);
    console.log("kirim:", text);
  }

  return (
    <div className="flex min-h-screen bg-stone-50 text-stone-800">
      {/* ---------- Sidebar ---------- */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[220px] transform border-r border-stone-200 bg-stone-50 transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col px-3 py-4">
          {/* Brand */}
          <div className="flex items-center gap-2 px-2 pb-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-stone-200 text-stone-700">
              <Gavel size={15} />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium text-stone-800">ChatAI</p>
              <p className="text-[10px] tracking-wide text-stone-400">
                DPRD SUMENEP
              </p>
            </div>
          </div>

          {/* Tanya baru */}
          <button className="mb-1 flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 transition hover:bg-stone-100">
            <Plus size={15} />
            Tanya baru
          </button>

          {/* Navigasi */}
          <p className="px-2 pb-1 pt-4 text-[11px] font-medium text-stone-400">
            Navigasi
          </p>
          <nav className="flex flex-col gap-0.5">
            {NAV_PRIMARY.map(({ label, icon: Icon, active }) => (
              <a
                key={label}
                href="#"
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] transition ${
                  active
                    ? "bg-stone-200/70 text-stone-900"
                    : "text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                }`}
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </nav>

          {/* Informasi */}
          <p className="px-2 pb-1 pt-4 text-[11px] font-medium text-stone-400">
            Informasi
          </p>
          <nav className="flex flex-col gap-0.5">
            {NAV_SECONDARY.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                className="flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] text-stone-500 transition hover:bg-stone-100 hover:text-stone-800"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </nav>

          {/* User */}
          <div className="mt-auto flex items-center gap-2 border-t border-stone-200 px-2 pt-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-200 text-[11px] font-medium text-stone-600">
              {userName ? initials(userName) : "?"}
            </div>
            <span className="text-xs text-stone-500">
              {userName || "Warga"}
            </span>
          </div>
        </div>
      </aside>

      {/* Overlay untuk mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ---------- Konten utama ---------- */}
      <main className="flex flex-1 flex-col">
        {/* Topbar mobile (hamburger) */}
        <div className="flex items-center gap-2 border-b border-stone-200 px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-1.5 text-stone-600 hover:bg-stone-100"
            aria-label="Buka menu"
          >
            <PanelLeft size={18} />
          </button>
          <span className="text-sm font-medium">ChatAI DPRD</span>
        </div>

        {/* Area tengah */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
          {/* Sapaan + headline */}
          <div className="mb-2 flex items-center gap-3">
            <Sparkles size={26} className="text-stone-400" />
            <h1 className="text-center text-[32px] font-medium leading-tight text-stone-800">
              {greeting}
              {userName ? `, ${userName}` : ""}
            </h1>
          </div>

          <p className="mb-7 max-w-md text-center text-sm text-stone-500">
            Tanyakan APBD, Perda, Pokir, Reses, Aspirasi, atau profil anggota
            DPRD Kabupaten Sumenep.
          </p>

          {/* Kotak input — langsung, tanpa quick prompt di bawahnya */}
          <div className="w-full max-w-xl rounded-2xl border border-stone-300 bg-white p-3.5 shadow-sm transition focus-within:border-stone-400">
            <textarea
              rows={1}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Tanyakan sesuatu…"
              className="mb-7 w-full resize-none bg-transparent text-[15px] text-stone-800 placeholder-stone-400 outline-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-stone-400">
                <button
                  className="rounded-md p-1 transition hover:bg-stone-100 hover:text-stone-600"
                  aria-label="Lampirkan"
                >
                  <Plus size={18} />
                </button>
                <button
                  className="rounded-md p-1 transition hover:bg-stone-100 hover:text-stone-600"
                  aria-label="Suara"
                >
                  <Mic size={18} />
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={!query.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-200 text-stone-600 transition hover:bg-stone-300 disabled:opacity-40"
                aria-label="Kirim"
              >
                <ArrowUp size={17} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ---------- helpers ----------
function getGreeting() {
  const h = new Date().getHours();
  if (h < 11) return "Selamat pagi";
  if (h < 15) return "Selamat siang";
  if (h < 18) return "Selamat sore";
  return "Selamat malam";
}

function initials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}
