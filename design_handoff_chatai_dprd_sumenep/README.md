# Handoff: ChatAI DPRD Sumenep — Public AI Persona Platform

## Overview
ChatAI DPRD Sumenep is the **public-facing** side of a subscription SaaS product (operated by a
third party, mataGen.ai) where the DPRD Sumenep is the paying customer. The concept is
"a ChatGPT-style space for each of the 50 members of the DPRD (Regional House of Representatives)
of Sumenep Regency." Citizens browse/filter the 50 members and open a clean chat room to submit
aspirations to a specific member's **Persona Digital**.

It is explicitly **NOT** an information portal and **NOT** a FAQ chatbot. The whole user flow is:
**Search / Filter member → pick a member → start a conversation.**

There are two screens, each in desktop + mobile:
1. **Beranda (Home)** — hero, search, highlight slider, filterable grid of all 50 members, latest-info cards.
2. **Ruang Percakapan (Chat)** — ChatGPT/Claude-style conversation room scoped to one member.

## About the Design Files
The files in this bundle are **design references created in HTML** (a streaming "Design Component"
prototype), demonstrating the intended look, layout, copy, data, and interaction behavior. **They are
not production code to copy verbatim.** The task is to **recreate these designs in the target
codebase's existing environment** (e.g. React/Next, Vue/Nuxt, Laravel+Blade, native, etc.) using its
established component library, routing, and styling conventions. If no codebase exists yet, pick the
most appropriate stack for a government public web app (a server-rendered React/Next.js app with a
component library is a reasonable default) and implement there.

> The `.dc.html` files depend on a proprietary runtime (`support.js`) and a custom templating syntax
> (`<sc-for>`, `<sc-if>`, `<dc-import>`, `{{ }}` holes). **Do not** try to port that runtime — read the
> files only to extract layout, styling, data, and logic, then rebuild with normal components.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, radii, shadows, and interactions are all
specified below and in the HTML. Recreate the UI pixel-accurately using the codebase's libraries.

---

## Design Tokens

### Colors
| Token | Hex / value | Usage |
|---|---|---|
| Navy 900 | `#04162a` | Darkest gradient stop (home bg) |
| Navy 800 | `#08213c` | Mid gradient stop, browser chrome bar |
| Navy / Primary | `#0B3C6F` | Brand primary, avatar gradient start, user chat bubble |
| Royal / Secondary | `#1E5AA8` | Avatar gradient mid, user bubble gradient, links |
| Gold / Accent | `#D4AF37` | Accent: badges, CTA buttons, dots (tweakable prop `accent`) |
| Gold text | `#EBDDAE` | Gold-tinted text on dark (committee/fraksi labels) |
| Red | `#E5484D` | The "AI" in the logotype, the ".ai" in "mataGen.ai" |
| Text Hi (dark bg) | `#F4F8FF` | Headings / primary text on navy |
| Text Mid (dark bg) | `rgba(231,240,255,0.70)` | Body text on navy |
| Glass fill | `rgba(255,255,255,0.07)` | Card background on home |
| Glass fill (grid card) | `rgba(255,255,255,0.06)` | Grid cards |
| Glass border | `rgba(255,255,255,0.14)` | Card borders on navy |
| Chat app bg | `#F3F5F9` | Chat screen background |
| Chat persona bubble | `#ffffff`, border `#E6EAF2`, text `#1A2A40` | Member's message bubble |
| Chat header text | `#0B2540` (name), `#5B6B82` (meta) | Chat header |
| Online dot | `#1F9D55` | Green dot in "Persona Digital" badge |

Home background gradient (exact):
```css
background:
  radial-gradient(1200px 620px at 82% -12%, rgba(30,90,168,0.45), transparent 60%),
  radial-gradient(900px 520px at -8% 14%, rgba(212,175,55,0.10), transparent 55%),
  linear-gradient(165deg,#0c3158 0%,#08213c 58%,#04162a 100%);
```

Avatar gradient (initials chips, all members):
```css
background: linear-gradient(140deg,#0B3C6F 0%,#1E5AA8 52%,#D4AF37 130%);
border: 2px solid rgba(212,175,55,0.5);
```

Accent helper: gold is a tweakable prop. From a hex `accent`, derive:
`aSoft = rgba(accent,0.14)` (badge fills), `aBorder = rgba(accent,0.35)`,
`aBorderStrong = rgba(accent,0.6)` (hover borders), CTA gradient `linear-gradient(135deg, accent, accent)`.

### Typography
- Family: **Inter** (weights 400/500/600/700/800). Fallback `system-ui, sans-serif`.
- H1 hero: 800, **44px** desktop / 34px tablet / 26px mobile, line-height 1.08, letter-spacing -0.5px.
- Section H2: 700, **24 / 22 / 19px**, letter-spacing -0.2px.
- Card name: 700, 16.5px (slider) / 14.5px (grid).
- Body / chat bubble: 14.5px, line-height 1.55.
- Small meta: 11.5–13px.
- Logotype "ChatAI DPRD SUMENEP": 800/700, 17px.

### Spacing / Radius / Shadow
- Page horizontal padding: 48px (desktop) / 32px (tablet) / 18px (mobile). Content `max-width: 1440px`, centered.
- Radii: search box 20px; slider card 24px; grid card 20px; info card 18px; chip/pill 999px; buttons 11–14px; chat bubbles 20px (with one 6px corner toward sender); avatars 50%.
- Card shadow (slider): `0 26px 60px -34px rgba(0,0,0,0.8)`; hover `0 34px 74px -28px rgba(212,175,55,0.34)`.
- Search shadow: `0 22px 55px -24px rgba(0,0,0,0.7)`.

### Responsive breakpoints (measured by **container width**, not viewport)
| bp | width | grid cols | info cols |
|---|---|---|---|
| lg | ≥ 1100px | 4 | 2 |
| md | ≥ 760px | 3 | 2 |
| sm | < 760px | 2 | 1 |

Verify at 1440, 1280, 1024, 768, 430, 375, 360. No horizontal overflow at any width.
> Implementation note: the prototype computes layout from the **element's own width** (ResizeObserver),
> so it adapts inside fixed-width frames. In a normal app you can use ordinary CSS media/container queries.

---

## Screen 1 — Beranda (Home)

**Theme:** dark immersive navy with glassmorphism cards. Vertical order (same desktop & mobile):
Header → Hero (emblem, badge, title, subtitle, search) → Highlight slider → Filter + full grid → Latest info → Footer.

### Header (sticky, blur)
- `position: sticky; top:0;` backdrop-blur 18px, bg `rgba(7,24,44,0.62)`, bottom border `rgba(255,255,255,0.10)`. Height ~64px.
- **Left:** circular white logo mark (42px, contains the DPRD emblem image) + logotype:
  `Chat` (white) `AI` (red `#E5484D`) ` DPRD SUMENEP` (light `rgba(233,240,255,0.92)`).
  > Spec originally said "DPRD SUMENEP" in black; on the dark header it is rendered light for legibility.
- **Right:** 4 minimalist icon buttons (38px, glass): Search (magnifier = circle+line), Notification
  (circle + gold dot badge), Profile (gradient circle "WS"), Menu (3 lines). Icons are simple inline SVG.

### Hero
- Centered DPRD **emblem** in an 88px white circle (logo image), shadow `0 22px 50px -18px rgba(0,0,0,0.65)`.
- Pill badge: "● PERSONA DIGITAL RESMI · DPRD KABUPATEN SUMENEP" (gold-tinted).
- H1: **"AI 50 Anggota DPRD Sumenep"**
- Subtitle: **"Silakan pilih Anggota DPRD untuk menyalurkan aspirasi Anda."**
- **Search box:** large, glass, radius 20px, height 66/62/54px, leading magnifier icon, placeholder
  **"Cari nama Anggota DPRD..."**. Filters the grid live (case-insensitive name match).

### Highlight slider ("Sorotan Anggota")
- Horizontal track, `transform: translateX()` with `transition: transform .65s cubic-bezier(.22,.61,.36,1)`.
- **Auto-advances every 3.6s**, wraps; **pauses on hover** (mouseenter/leave). Advance index bounded by
  `max(0, 8 - visibleCount)` where `visibleCount = floor(width / (cardWidth+18))`.
- Card width 300/280/228px; gap 18px. Cards are the **8 leadership figures** (see data: ids 23,50,44,26,41,13,28,36).
- Card content: 112px avatar (initials), name, **jabatan** (e.g. "Ketua DPRD"), chips (Fraksi gold pill +
  Komisi + Dapil), full-width gold CTA **"💬 Mulai Chat"**.
- Hover: `translateY(-7px) scale(1.02)`, gold border, gold-tinted shadow.

### Filter + full grid ("Daftar Lengkap Anggota")
- Right-aligned result count: **"N dari 50 anggota"**.
- Filter row (flex wrap, gap 10px): three `<select>` (custom gold caret) + a Reset button:
  - **Fraksi:** Semua Fraksi, PKB, PDI-P, Gerindra, NasDem, PAN, PPP, Demokrat, PKS, Hanura, PBB
  - **Komisi:** Semua Komisi, **Pimpinan DPRD**, Komisi I, Komisi II, Komisi III, Komisi IV
  - **Dapil:** Semua Dapil, Dapil 1 … Dapil 8
  - **Reset** clears all filters + search.
- Grid: 4/3/2 columns, gap 20/16/12px. Compact card: 54px avatar + name + `Fraksi · Dapil` + Komisi chip +
  gold-outline CTA that fills gold on hover. Card hover `translateY(-4px)`, gold border.
- Empty state (no matches): centered text "Tidak ada anggota yang cocok dengan pencarian Anda."

### Latest info ("📰 Informasi DPRD Terbaru")
2-column grid (1 col mobile) of 4 cards, each: category tag (AGENDA / BERITA / PENGUMUMAN / SIDANG) +
title + date·source. (Sample copy is in the HTML; replace with real CMS data.)

### Footer
Small. Left: 38px logo + "© 2026 Sekretariat DPRD Kabupaten Sumenep / Jl. Trunojoyo No. 163, Sumenep, Jawa Timur".
Right: "Dipersembahkan oleh **mataGen**(white)**.ai**(red)".

---

## Screen 2 — Ruang Percakapan (Chat)

**Theme:** clean light (ChatGPT/Claude style). Full-height column: header (fixed) → scrollable messages → input (fixed).

### Header (white, bottom border `#E6EAF2`)
- Back button (40px, `←` chevron) → returns to Home.
- 46px member avatar (initials gradient).
- Name (700, 15.5px) + small pill **"● Persona Digital"** (green dot, navy text on light navy fill).
- Sub-line: `Fraksi · Komisi · Dapil` (e.g. "PDI-P · Pimpinan · Dapil 4").
- **Never** label the persona as "AI", "chatbot", or "asisten" anywhere.

### Messages area (scrollable, `max-width: 760px` centered)
- A centered "Hari ini" date chip at top.
- **Persona bubble** (left): 34px avatar + white bubble, border `#E6EAF2`, radius `6px 20px 20px 20px`,
  text `#1A2A40`, soft shadow. Max-width 84%.
- **User bubble** (right): gradient `linear-gradient(135deg,#1E5AA8,#0B3C6F)`, white text, radius
  `20px 6px 20px 20px`, shadow `0 12px 26px -16px rgba(11,60,111,0.6)`. Max-width 84%.
- **Intro message** (first persona message, show EXACTLY):
  > "Selamat datang. Silakan pilih Anggota DPRD untuk menyalurkan aspirasi Anda terkait tugas, fungsi,
  > aspirasi masyarakat, pokok pikiran, kegiatan, maupun informasi DPRD Kabupaten Sumenep."

### Input bar (fixed bottom)
- White rounded container (radius 22px) with a text input (placeholder **"Tulis aspirasi Anda…"**) +
  navy **"Kirim"** button (arrow icon). Enter (without Shift) sends.
- Helper line under it: "Persona Digital resmi · DPRD Kabupaten Sumenep — dioperasikan oleh mataGen.ai".

---

## Interactions & Behavior
- **Open chat:** clicking anywhere on a member card (slider or grid), or its "Mulai Chat" button →
  switch to Chat view, set active member, seed messages with the intro message, clear input.
- **Send:** trim input; if non-empty, append a user message and clear input; after ~700ms append a
  persona reply (formal, deferential tone — see reply templates below). Auto-scroll messages to bottom
  (use `scrollTop = scrollHeight`, **never** `scrollIntoView`).
- **Filters/search:** recompute the filtered list reactively; update the "N dari 50" count.
- **Slider:** auto-advance every 3.6s, pause on hover, smooth transform transition.
- **Hover states:** cards lift + gold border; CTAs brighten.
- Mock reply templates (placeholders `{komisi}`, `{dapil}` filled from the active member; tone must read
  like a council member, never an AI/assistant):
  1. "Terima kasih atas aspirasi yang Bapak/Ibu sampaikan. Persoalan ini akan saya catat dan saya teruskan dalam rapat {komisi} untuk ditindaklanjuti bersama mitra kerja terkait."
  2. "Saya mengapresiasi masukan ini. Sebagai wakil dari {dapil}, saya berkomitmen mengawal usulan tersebut melalui pokok-pokok pikiran DPRD agar masuk dalam pembahasan anggaran."
  3. "Aspirasi seperti ini sangat penting bagi kami. Mohon sertakan lokasi dan rincian kebutuhannya agar dapat kami verifikasi di lapangan dan kami perjuangkan pada masa sidang berikutnya."
  4. "Baik, akan saya sampaikan kepada Pemerintah Kabupaten melalui mekanisme rapat dengar pendapat. Partisipasi masyarakat seperti inilah yang kami harapkan demi kemajuan Sumenep."
  > In production these would be replaced by the real backend/persona response service.

## State Management
- `view`: `'home' | 'chat'`
- `q`: search string (filters grid by name, case-insensitive)
- `fraksi`, `komisi`, `dapil`: active filter values (`''` = all)
- `activeMemberId`: number — which member's chat is open
- `messages`: `Array<{ role: 'persona' | 'user', text: string }>`
- `input`: chat input text
- `slide`: slider index (auto-incremented)
- `width`: measured container width (for responsive layout — replace with CSS queries in production)
- Derived: filtered member list; `resultLabel = "${n} dari 50 anggota"`; featured (leadership) list.

## Assets
- `Logo_DPRD_Kabupaten_Sumene.jpeg` — official emblem of DPRD Kabupaten Sumenep (Sumekar pegasus crest,
  rice & cotton wreath, "DPRD" banner). Provided by the client. Used in header mark, hero emblem, footer,
  and gallery badge. It has a **white background** (JPEG); the design places it inside a white circle so it
  reads cleanly on the dark navy header. A transparent PNG/SVG version would be ideal for production.
- Member avatars are **initials on a navy→gold gradient** — placeholders. Replace with real official
  photos when available (do not generate synthetic faces).
- All icons (search, notification, menu, back, send, select caret) are simple inline SVG — swap for the
  codebase's icon set.

## Data — the 50 members (official)
`id` is just stable ordering for the prototype. `komisi = 'Pimpinan'` for the 4 leaders.

| id | Name | Fraksi | Dapil | Komisi | Jabatan |
|---|---|---|---|---|---|
| 1 | Rasiidi | PKB | Dapil 1 | Komisi II | — |
| 2 | Agus Hariyanto | Gerindra | Dapil 1 | Komisi II | — |
| 3 | Nia Kurnia | PDI-P | Dapil 1 | Komisi IV | — |
| 4 | Sutan Hady Tjahyadi | PDI-P | Dapil 1 | Komisi I | — |
| 5 | Wiwid Harjo Yudanto | PKS | Dapil 1 | Komisi III | Sekretaris Komisi III |
| 6 | Musahwi | PAN | Dapil 1 | Komisi III | — |
| 7 | Hairul Anam | PPP | Dapil 1 | Komisi I | — *(see discrepancy note)* |
| 8 | Akhmadi Yazid | PKB | Dapil 2 | Komisi III | — |
| 9 | Holik | Gerindra | Dapil 2 | Komisi I | — |
| 10 | Eka Bahas Nur Ardiansyah | PDI-P | Dapil 2 | Komisi III | — |
| 11 | Salahuddin | PDI-P | Dapil 2 | Komisi II | — |
| 12 | Samsiyadi | NasDem | Dapil 2 | Komisi II | — |
| 13 | Faisal Muhlis | PAN | Dapil 2 | Komisi II | Ketua Komisi II |
| 14 | Afrian Mukhlash | Demokrat | Dapil 2 | Komisi III | — |
| 15 | Eksan | PKB | Dapil 3 | Komisi III | — |
| 16 | Irwan Hayat | PKB | Dapil 3 | Komisi II | Wakil Ketua Komisi II |
| 17 | Abd. Rahman | PDI-P | Dapil 3 | Komisi II | Sekretaris Komisi II |
| 18 | M. Ramzi | Hanura | Dapil 3 | Komisi IV | — |
| 19 | Siti Hosna | PAN | Dapil 3 | Komisi IV | — |
| 20 | Akhmad Jazuli | Demokrat | Dapil 3 | Komisi I | Wakil Ketua Komisi I |
| 21 | Moh. Asy'ari Motkhar | PPP | Dapil 3 | Komisi IV | Wakil Ketua Komisi IV |
| 22 | Muhammad Mirza Khumaini Hamid | PKB | Dapil 4 | Komisi I | — |
| 23 | H. Zainal (Arifin) | PDI-P | Dapil 4 | Pimpinan | **Ketua DPRD** |
| 24 | Ersat | NasDem | Dapil 4 | Komisi II | — |
| 25 | Hairul Anwar | PAN | Dapil 4 | Komisi I | — |
| 26 | Indra Wahyudi | Demokrat | Dapil 4 | Pimpinan | **Wakil Ketua DPRD** |
| 27 | Abd. Rahman | PPP | Dapil 4 | Komisi III | — |
| 28 | M. Muhri | PKB | Dapil 5 | Komisi III | Ketua Komisi III |
| 29 | Virzannida | PKB | Dapil 5 | Komisi IV | — |
| 30 | Endi | PDI-P | Dapil 5 | Komisi II | — |
| 31 | Afrilia Wahyuni | NasDem | Dapil 5 | Komisi IV | Sekretaris Komisi IV |
| 32 | Moh. Fendi | Demokrat | Dapil 5 | Komisi II | — |
| 33 | Sami Oeddin (Sami'oeddin) | PKB | Dapil 6 | Komisi IV | — |
| 34 | Umar | PDI-P | Dapil 6 | Komisi IV | — |
| 35 | Gunaifi Syarif Arrodi | PAN | Dapil 6 | Komisi II | — |
| 36 | Mulyadi | Demokrat | Dapil 6 | Komisi IV | Ketua Komisi IV |
| 37 | Masdawi | Demokrat | Dapil 6 | Komisi II | — |
| 38 | Juhari | PPP | Dapil 6 | Komisi II | — |
| 39 | Saipur Rahman | PKB | Dapil 7 | Komisi I | Sekretaris Komisi I |
| 40 | Hosnan | PDI-P | Dapil 7 | Komisi III | — |
| 41 | Darul Hasyim Fath | PDI-P | Dapil 7 | Komisi I | Ketua Komisi I |
| 42 | Ahmad Juhairi | NasDem | Dapil 7 | Komisi I | — |
| 43 | Mas'ud Ali | PPP | Dapil 7 | Komisi III | — |
| 44 | Dulsiam | PKB | Dapil 8 | Pimpinan | **Wakil Ketua DPRD** |
| 45 | Wahyudi | PDI-P | Dapil 8 | Komisi III | Wakil Ketua Komisi III |
| 46 | Muta'em | NasDem | Dapil 8 | Komisi III | — |
| 47 | Syamsul Bahri | PKS | Dapil 8 | Komisi IV | — |
| 48 | Badrul Aini | PBB | Dapil 8 | Komisi III | — |
| 49 | Mohammad Hanafi | Demokrat | Dapil 8 | Komisi III | — |
| 50 | M. Syukri | PPP | Dapil 8 | Pimpinan | **Wakil Ketua DPRD** |

### Dapil areas
- Dapil 1: Kota Sumenep · Kalianget · Talango · Batuan
- Dapil 2: Bluto · Saronggi · Lenteng · Giligenteng
- Dapil 3: Guluk-Guluk · Ganding · Pragaan
- Dapil 4: Ambunten · Pasongsongan · Rubaru
- Dapil 5: Manding · Dasuk · Batuputih
- Dapil 6: Batang Batang · Dungkek · Gapura
- Dapil 7: Gayam · Nonggunong · Raas · Masalembu
- Dapil 8: Arjasa · Sapeken · Kangayan

### ⚠ Open data discrepancy (please confirm)
The official Komisi I roster lists **"Bambang Eko Iswanto"**, who is **not** present in the 50 per-dapil
names. Conversely, **"Hairul Anam" (Dapil 1, PPP)** does not appear in any commission. As a placeholder,
the prototype assigns **Hairul Anam to Komisi I**. Confirm the correct member (or whether a PAW /
replacement occurred) before launch.

---

## Files in this bundle
- `ChatAI DPRD Sumenep.dc.html` — the **gallery/presentation** file: lays out all 4 screens
  (Home & Chat × Desktop 1440 + Mobile 390) in labeled frames with browser/phone chrome. Good overview.
- `Persona App.dc.html` — the **actual app** component: contains all layout, styling, the 50-member data,
  committee mapping, filter/search/slider/chat logic, and reply templates. **This is the primary
  reference** for implementation.
- `Logo_DPRD_Kabupaten_Sumene.jpeg` — official emblem asset.

> Both `.dc.html` files reference a runtime `support.js` that is **not** included and should **not** be
> ported. Read the markup/logic for intent; rebuild in your stack.
