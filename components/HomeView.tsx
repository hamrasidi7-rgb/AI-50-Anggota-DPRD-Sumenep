'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { MEMBERS, SOROTAN, FRAKSI_OPTIONS, KOMISI_OPTIONS, DAPIL_OPTIONS, type Member } from '@/lib/data'

// ── Design tokens ─────────────────────────────────────────────────────────────
const NAVY  = '#0A2E5C'
const BLUE  = '#1565C0'
const GOLD  = '#F4C542'
const LBLUE = '#EAF4FF'

// ── Types ─────────────────────────────────────────────────────────────────────
interface Props {
  q: string;       onQ(v: string): void
  fraksi: string;  onFraksi(v: string): void
  komisi: string;  onKomisi(v: string): void
  dapil: string;   onDapil(v: string): void
  onReset(): void
  onOpenChat(id: number): void
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Avatar({ ini, size }: { ini: string; size: number }) {
  return (
    <div
      className="avatar-grad flex items-center justify-center rounded-full text-white font-extrabold flex-shrink-0"
      style={{
        width: size, height: size,
        fontSize: size * 0.24,
        border: '2px solid rgba(212,175,55,0.5)',
        boxShadow: '0 8px 20px -8px rgba(10,46,92,0.35)',
      }}
    >
      {ini}
    </div>
  )
}

function SliderCard({ member, cardWidth, onChat }: { member: Member; cardWidth: number; onChat(): void }) {
  return (
    <div
      onClick={onChat}
      className="flex-shrink-0 cursor-pointer rounded-3xl bg-white"
      style={{
        width: cardWidth,
        padding: '24px 22px',
        border: '1px solid #E0E7F0',
        boxShadow: '0 4px 20px rgba(10,46,92,0.07)',
        transition: 'transform .28s ease, box-shadow .28s ease, border-color .28s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-7px) scale(1.02)'
        el.style.borderColor = BLUE
        el.style.boxShadow = '0 16px 40px rgba(21,101,192,0.18)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.transform = ''
        el.style.borderColor = '#E0E7F0'
        el.style.boxShadow = '0 4px 20px rgba(10,46,92,0.07)'
      }}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <Avatar ini={member.ini} size={cardWidth >= 300 ? 112 : cardWidth >= 280 ? 104 : 90} />
        <div>
          <p className="font-bold text-[16.5px] leading-tight" style={{ color: NAVY }}>{member.name}</p>
          <p className="text-xs mt-1 min-h-[14px]" style={{ color: '#4A6080' }}>{member.jabatan}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          <Chip label={member.fraksi} gold />
          <Chip label={member.komisi} />
          <Chip label={member.dapil} />
        </div>
        <button
          className="w-full mt-1 h-[42px] rounded-[13px] font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer border-0"
          style={{
            background: GOLD,
            color: NAVY,
            boxShadow: '0 6px 18px rgba(244,197,66,0.45)',
          }}
        >
          💬 Mulai Chat
        </button>
      </div>
    </div>
  )
}

function GridCard({ member, onChat }: { member: Member; onChat(): void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onChat}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer rounded-[20px] p-[18px] bg-white"
      style={{
        border: `1px solid ${hovered ? BLUE : '#E0E7F0'}`,
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 8px 24px rgba(21,101,192,0.14)' : '0 2px 8px rgba(10,46,92,0.06)',
        transition: 'transform .24s ease, border-color .24s ease, box-shadow .24s ease',
      }}
    >
      <div className="flex gap-3 items-center">
        <div
          className="avatar-grad w-[54px] h-[54px] flex-shrink-0 rounded-full flex items-center justify-center text-white font-extrabold text-[17px]"
          style={{ border: '1.5px solid rgba(212,175,55,0.45)' }}
        >
          {member.ini}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-[14.5px] leading-tight truncate" style={{ color: NAVY }}>{member.name}</p>
          <p className="text-[11.5px] mt-0.5 truncate" style={{ color: '#4A6080' }}>{member.fraksi} · {member.dapil}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        <span
          className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
          style={{ background: LBLUE, color: BLUE, border: '1px solid rgba(21,101,192,0.2)' }}
        >
          {member.komisi}
        </span>
      </div>

      <GridCTA hovered={hovered} />
    </div>
  )
}

function GridCTA({ hovered }: { hovered: boolean }) {
  const [btnHovered, setBtnHovered] = useState(false)
  const active = hovered || btnHovered

  return (
    <button
      onMouseEnter={() => setBtnHovered(true)}
      onMouseLeave={() => setBtnHovered(false)}
      className="w-full mt-3 h-[38px] rounded-[11px] font-bold text-[13px] flex items-center justify-center gap-1.5 cursor-pointer border-0"
      style={{
        background: active ? GOLD : BLUE,
        color: active ? NAVY : '#fff',
        boxShadow: active ? '0 4px 14px rgba(244,197,66,0.4)' : '0 4px 14px rgba(21,101,192,0.25)',
        transition: 'background .2s ease, color .2s ease, box-shadow .2s ease',
      }}
    >
      💬 Mulai Chat
    </button>
  )
}

function Chip({ label, gold }: { label: string; gold?: boolean }) {
  return (
    <span
      className="px-3 py-1 rounded-full text-[11.5px] font-semibold"
      style={
        gold
          ? { background: 'rgba(244,197,66,0.18)', border: '1px solid rgba(244,197,66,0.5)', color: '#7A5A00' }
          : { background: LBLUE, border: '1px solid rgba(21,101,192,0.2)', color: BLUE }
      }
    >
      {label}
    </span>
  )
}

function FilterSelect({ id, value, onChange, placeholder, options }: {
  id: string; value: string; onChange(v: string): void; placeholder: string; options: string[]
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="select-gold flex-1 min-w-0 h-[46px] rounded-[13px] font-medium text-sm cursor-pointer outline-none px-4 pr-9"
      style={{
        background: '#fff',
        border: '1px solid #D4DCE8',
        color: NAVY,
        minWidth: 150,
      }}
    >
      <option value="">{placeholder}</option>
      {options.map(o => (
        <option key={o} value={o}>{o === 'Pimpinan' ? 'Pimpinan DPRD' : o}</option>
      ))}
    </select>
  )
}

// ── Info card data ────────────────────────────────────────────────────────────
const INFO_CARDS = [
  { tag: 'AGENDA',     tagBg: 'rgba(244,197,66,0.15)',  tagColor: '#7A5A00', title: 'Rapat Paripurna Penyampaian LKPJ Bupati Tahun 2025',   meta: '18 Juni 2026 · Ruang Sidang Utama'   },
  { tag: 'BERITA',     tagBg: 'rgba(21,101,192,0.12)',  tagColor: '#1565C0', title: 'DPRD Sumenep Dorong Percepatan Infrastruktur Kepulauan', meta: '14 Juni 2026 · Humas DPRD'            },
  { tag: 'PENGUMUMAN', tagBg: 'rgba(229,72,77,0.12)',   tagColor: '#B91C1C', title: 'Jadwal Reses Masa Sidang II Tahun 2026',                 meta: '10 Juni 2026 · Sekretariat Dewan'    },
  { tag: 'SIDANG',     tagBg: 'rgba(10,46,92,0.08)',    tagColor: '#0A2E5C', title: 'Pembahasan Raperda Retribusi Daerah',                    meta: '06 Juni 2026 · Komisi II'            },
]

// ── Main component ────────────────────────────────────────────────────────────
export default function HomeView({ q, fraksi, komisi, dapil, onQ, onFraksi, onKomisi, onDapil, onReset, onOpenChat }: Props) {
  const [slide, setSlide]         = useState(0)
  const [cardWidth, setCardWidth] = useState(300)
  const pausedRef  = useRef(false)
  const cardWRef   = useRef(300)

  useEffect(() => {
    const update = () => {
      const w  = window.innerWidth
      const cw = w >= 1100 ? 300 : w >= 768 ? 280 : 228
      cardWRef.current = cw
      setCardWidth(cw)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (pausedRef.current) return
      const cw      = cardWRef.current
      const visible = Math.max(1, Math.floor(window.innerWidth / (cw + 18)))
      const max     = Math.max(0, SOROTAN.length - visible)
      if (max <= 0) return
      setSlide(s => (s >= max ? 0 : s + 1))
    }, 3600)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => { setSlide(0) }, [q])

  const filtered = MEMBERS.filter(m =>
    (!fraksi || m.fraksi === fraksi) &&
    (!komisi || m.komisi === komisi) &&
    (!dapil  || m.dapil  === dapil)  &&
    (!q      || m.name.toLowerCase().includes(q.toLowerCase()))
  )

  const sliderOffset = slide * (cardWidth + 18)

  return (
    <div className="scroll-y w-full h-full overflow-y-auto" style={{ background: '#F5F7FA', color: NAVY }}>

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-30" style={{ background: NAVY, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-content mx-auto px-4 md:px-8 lg:px-12 py-3 flex items-center gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className="w-[42px] h-[42px] flex-shrink-0 rounded-full bg-white flex items-center justify-center overflow-hidden"
              style={{ border: '1.5px solid rgba(244,197,66,0.6)', boxShadow: '0 5px 14px -5px rgba(0,0,0,0.45)' }}
            >
              <Image src="/logo.jpeg" alt="Logo DPRD" width={36} height={36} className="object-contain" />
            </div>
            <div className="font-extrabold tracking-[0.2px] leading-[1.2] text-center md:text-left">
              <div className="text-[14px] md:text-[17px]">
                <span className="text-white">Chat</span>
                <span className="text-dp-red">AI</span>
                <span className="font-bold" style={{ color: 'rgba(233,240,255,0.92)' }}>&nbsp;DPRD</span>
                <span className="hidden md:inline font-bold" style={{ color: 'rgba(233,240,255,0.92)' }}>&nbsp;SUMENEP</span>
              </div>
              <div className="md:hidden text-[14px] font-bold" style={{ color: 'rgba(233,240,255,0.92)' }}>
                SUMENEP
              </div>
            </div>
          </div>
          <nav className="flex items-center gap-2 flex-shrink-0">
            <IconBtn title="Cari">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke="rgba(231,240,255,.85)" strokeWidth="1.8"/><line x1="15.5" y1="15.5" x2="20" y2="20" stroke="rgba(231,240,255,.85)" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </IconBtn>
            <IconBtn title="Menu">
              <div className="flex flex-col gap-[3.5px] items-center">
                {[0,1,2].map(i => (
                  <span key={i} className="block w-4 h-[1.8px] rounded-sm" style={{ background: 'rgba(231,240,255,0.85)' }} />
                ))}
              </div>
            </IconBtn>
          </nav>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(160deg, #0F4C81 0%, #1565C0 100%)' }}>
        <div className="max-w-content mx-auto px-4 md:px-8 lg:px-12">
          <section className="pt-6 pb-8 text-center">
            <p
              className="mx-auto max-w-[560px] leading-relaxed mb-5"
              style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.92)' }}
            >
              Silakan pilih Anggota DPRD untuk menyalurkan aspirasi Anda.
            </p>
            <div className="mx-auto max-w-[680px] relative">
              <span className="absolute left-[22px] top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8"/><line x1="15.5" y1="15.5" x2="20" y2="20" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </span>
              <input
                type="text"
                value={q}
                onChange={e => onQ(e.target.value)}
                placeholder="Cari nama Anggota DPRD..."
                className="placeholder-home w-full rounded-[20px] text-white text-base font-[inherit] outline-none pl-[52px] pr-[22px] box-border"
                style={{
                  height: 'clamp(54px, 6vw, 66px)',
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.30)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                }}
              />
            </div>
          </section>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <div className="max-w-content mx-auto px-4 md:px-8 lg:px-12 pb-2">

        {/* SLIDER */}
        <section
          className="mt-10"
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => { pausedRef.current = false }}
        >
          <div className="flex items-end justify-between mb-3.5 gap-3">
            <h2 className="m-0 font-bold tracking-[-0.2px]" style={{ fontSize: 'clamp(19px, 2.2vw, 24px)', color: NAVY }}>
              SOROTAN ANGGOTA
            </h2>
            <span className="text-[12.5px] whitespace-nowrap" style={{ color: '#8A9BB0' }}>
              Geser untuk lihat lainnya →
            </span>
          </div>
          <div className="overflow-hidden">
            <div
              className="no-scrollbar flex gap-[18px]"
              style={{
                transform: `translateX(-${sliderOffset}px)`,
                transition: 'transform 0.65s cubic-bezier(.22,.61,.36,1)',
                willChange: 'transform',
              }}
            >
              {SOROTAN.map(m => (
                <SliderCard key={m.id} member={m} cardWidth={cardWidth} onChat={() => onOpenChat(m.id)} />
              ))}
            </div>
          </div>
        </section>

        {/* FULL GRID */}
        <section className="mt-12">
          <div className="flex items-end justify-between gap-3 flex-wrap mb-4">
            <h2 className="m-0 font-bold tracking-[-0.2px]" style={{ fontSize: 'clamp(19px, 2.2vw, 24px)', color: NAVY }}>
              Daftar Lengkap Anggota
            </h2>
            <span className="text-[13px]" style={{ color: '#8A9BB0' }}>
              {filtered.length} dari 50 anggota
            </span>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2.5 mb-5">
            <FilterSelect id="f-fraksi" value={fraksi} onChange={onFraksi} placeholder="Semua Fraksi" options={FRAKSI_OPTIONS} />
            <FilterSelect id="f-komisi" value={komisi} onChange={onKomisi} placeholder="Semua Komisi" options={KOMISI_OPTIONS} />
            <FilterSelect id="f-dapil"  value={dapil}  onChange={onDapil}  placeholder="Semua Dapil"  options={DAPIL_OPTIONS}  />
            <button
              onClick={onReset}
              className="flex-shrink-0 h-[46px] px-[18px] rounded-[13px] font-semibold text-[13.5px] cursor-pointer"
              style={{ border: '1px solid #D4DCE8', background: '#fff', color: '#4A6080' }}
            >
              Reset
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
            {filtered.map(m => (
              <GridCard key={m.id} member={m} onChat={() => onOpenChat(m.id)} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center py-12 text-[15px]" style={{ color: '#8A9BB0' }}>
              Tidak ada anggota yang cocok dengan pencarian Anda.
            </p>
          )}
        </section>

        {/* LATEST INFO */}
        <section className="mt-14 rounded-2xl p-6 md:p-8" style={{ background: LBLUE }}>
          <h2 className="m-0 mb-4 font-bold tracking-[-0.2px]" style={{ fontSize: 'clamp(19px, 2.2vw, 24px)', color: NAVY }}>
            📰 Informasi DPRD Terbaru
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {INFO_CARDS.map(card => (
              <div
                key={card.tag + card.title}
                className="p-5 rounded-[18px] bg-white"
                style={{ border: '1px solid #D8E8F8' }}
              >
                <span
                  className="inline-block px-2.5 py-0.5 rounded-[7px] text-[11px] font-bold tracking-[0.5px]"
                  style={{ background: card.tagBg, color: card.tagColor }}
                >
                  {card.tag}
                </span>
                <p className="mt-3 font-semibold text-[14.5px] leading-snug" style={{ color: NAVY }}>{card.title}</p>
                <p className="mt-2.5 text-xs" style={{ color: '#8A9BB0' }}>{card.meta}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="mt-8" style={{ background: NAVY }}>
        <div className="max-w-content mx-auto px-4 md:px-8 lg:px-12 py-6 flex flex-wrap gap-3.5 justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-[38px] h-[38px] flex-shrink-0 rounded-full bg-white flex items-center justify-center overflow-hidden">
              <Image src="/logo.jpeg" alt="Logo DPRD" width={32} height={32} className="object-contain" />
            </div>
            <p className="text-[12.5px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              © 2026 Sekretariat DPRD Kabupaten Sumenep<br />
              Jl. Trunojoyo No. 163, Sumenep, Jawa Timur
            </p>
          </div>
          <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Dipersembahkan oleh{' '}
            <span className="text-white font-bold">mataGen</span>
            <span className="text-dp-red font-bold">.ai</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

// ── Shared icon button ────────────────────────────────────────────────────────
function IconBtn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <button
      title={title}
      className="relative w-[38px] h-[38px] rounded-[11px] flex items-center justify-center cursor-pointer"
      style={{ border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.08)' }}
    >
      {children}
    </button>
  )
}
