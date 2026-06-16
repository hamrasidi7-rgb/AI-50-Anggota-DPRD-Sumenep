'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { INTRO, REPLIES, type Member, type Message } from '@/lib/data'

interface Props {
  member: Member
  onBack(): void
}

export default function ChatView({ member, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([{ role: 'persona', text: INTRO }])
  const [input, setInput]       = useState('')
  const scrollRef   = useRef<HTMLDivElement>(null)
  const replyTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const memberRef   = useRef(member)
  memberRef.current = member

  // Reset conversation when member changes
  useEffect(() => {
    if (replyTimer.current) clearTimeout(replyTimer.current)
    setMessages([{ role: 'persona', text: INTRO }])
    setInput('')
  }, [member.id])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Cleanup on unmount
  useEffect(() => {
    return () => { if (replyTimer.current) clearTimeout(replyTimer.current) }
  }, [])

  function send() {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages(prev => {
      const next = [...prev, { role: 'user' as const, text }]
      if (replyTimer.current) clearTimeout(replyTimer.current)
      replyTimer.current = setTimeout(() => {
        const am       = memberRef.current
        const userCount = next.filter(m => m.role === 'user').length
        const idx      = (userCount - 1) % REPLIES.length
        const reply    = REPLIES[idx]
          .replace(/\{komisi\}/g, am.komisi)
          .replace(/\{dapil\}/g,  am.dapil)
          .replace(/\{name\}/g,   am.name)
        setMessages(p => [...p, { role: 'persona', text: reply }])
      }, 700)
      return next
    })
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="flex flex-col w-full h-full bg-chat-bg text-[#0B2540]">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="flex-shrink-0 bg-white" style={{ borderBottom: '1px solid #E6EAF2', boxShadow: '0 1px 0 rgba(11,37,64,0.02)' }}>
        <div className="flex items-center gap-3 px-4 md:px-7 lg:px-8 py-3">
          {/* Back */}
          <button
            onClick={onBack}
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer bg-white"
            style={{ border: '1px solid #E1E6F0' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M14 6l-6 6 6 6" stroke="#0B3C6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Avatar */}
          <div
            className="avatar-grad w-[46px] h-[46px] flex-shrink-0 rounded-full flex items-center justify-center text-white font-extrabold text-base"
            style={{ border: '1.5px solid rgba(212,175,55,0.4)' }}
          >
            {member.ini}
          </div>

          {/* Name + meta */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[15.5px] text-[#0B2540] truncate">{member.name}</span>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-navy"
                style={{ background: 'rgba(11,60,111,0.07)', border: '1px solid rgba(11,60,111,0.12)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-online-dot inline-block" />
                Persona Digital
              </span>
            </div>
            <p className="text-[12.5px] text-[#5B6B82] mt-0.5 truncate">
              {member.fraksi} · {member.komisi} · {member.dapil}
            </p>
          </div>
        </div>
      </header>

      {/* ── MESSAGES ───────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="scroll-y flex-1 overflow-y-auto px-4 md:px-7 lg:px-8 py-6"
      >
        <div className="max-w-chat mx-auto flex flex-col gap-4">
          {/* Date chip */}
          <div className="text-center mb-1">
            <span className="text-[11.5px] text-[#8A97AB] bg-[#E9EDF4] px-3 py-1 rounded-full">
              Hari ini
            </span>
          </div>

          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} ini={member.ini} />
          ))}
        </div>
      </div>

      {/* ── INPUT BAR ──────────────────────────────────────── */}
      <div
        className="flex-shrink-0 px-4 md:px-7 lg:px-8 pt-3.5 pb-[18px]"
        style={{
          background: 'linear-gradient(180deg,rgba(243,245,249,0),#F3F5F9 30%)',
          borderTop: '1px solid #E8ECF3',
        }}
      >
        <div
          className="max-w-chat mx-auto flex items-end gap-2.5 bg-white rounded-[22px] pl-[18px] pr-2 py-2"
          style={{ border: '1px solid #E1E6F0', boxShadow: '0 14px 36px -22px rgba(11,37,64,0.35)' }}
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Tulis aspirasi Anda…"
            className="placeholder-chat flex-1 min-w-0 border-none outline-none bg-transparent text-[14.5px] font-[inherit] text-[#0B2540] py-2.5"
            autoFocus
          />
          <button
            onClick={send}
            className="flex-shrink-0 h-[42px] px-5 rounded-[14px] text-white font-bold text-sm flex items-center gap-1.5 border-0 cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#1E5AA8,#0B3C6F)' }}
          >
            Kirim
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h13M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <p className="max-w-chat mx-auto mt-2 text-center text-[11px] text-[#9AA6B8]">
          Persona Digital resmi · DPRD Kabupaten Sumenep — dioperasikan oleh mataGen.ai
        </p>
      </div>
    </div>
  )
}

// ── Message bubble ────────────────────────────────────────────────────────────
function MessageBubble({ msg, ini }: { msg: Message; ini: string }) {
  if (msg.role === 'persona') {
    return (
      <div className="self-start flex gap-2.5 items-end max-w-[84%]">
        <div
          className="avatar-grad w-[34px] h-[34px] flex-shrink-0 rounded-full flex items-center justify-center text-white font-bold text-xs"
        >
          {ini}
        </div>
        <div
          className="bg-white text-[#1A2A40] text-[14.5px] leading-[1.55] px-[18px] py-3.5"
          style={{
            border: '1px solid #E6EAF2',
            borderRadius: '6px 20px 20px 20px',
            boxShadow: '0 10px 24px -16px rgba(11,37,64,0.25)',
          }}
        >
          {msg.text}
        </div>
      </div>
    )
  }

  return (
    <div className="self-end max-w-[84%]">
      <div
        className="text-white text-[14.5px] leading-[1.55] px-[18px] py-3.5"
        style={{
          background: 'linear-gradient(135deg,#1E5AA8,#0B3C6F)',
          borderRadius: '20px 6px 20px 20px',
          boxShadow: '0 12px 26px -16px rgba(11,60,111,0.6)',
        }}
      >
        {msg.text}
      </div>
    </div>
  )
}
