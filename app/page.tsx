'use client'

import { useState } from 'react'
import HomeView from '@/components/HomeView'
import ChatView from '@/components/ChatView'
import { MEMBERS } from '@/lib/data'

export default function Page() {
  const [view, setView]               = useState<'home' | 'chat'>('home')
  const [q, setQ]                     = useState('')
  const [fraksi, setFraksi]           = useState('')
  const [komisi, setKomisi]           = useState('')
  const [dapil, setDapil]             = useState('')
  const [activeMemberId, setActiveMemberId] = useState(MEMBERS[2].id)

  const activeMember = MEMBERS.find(m => m.id === activeMemberId) ?? MEMBERS[2]

  function openChat(id: number) {
    setActiveMemberId(id)
    setView('chat')
  }

  function resetFilters() {
    setQ(''); setFraksi(''); setKomisi(''); setDapil('')
  }

  if (view === 'chat') {
    return (
      <ChatView
        member={activeMember}
        onBack={() => setView('home')}
      />
    )
  }

  return (
    <HomeView
      q={q}         onQ={setQ}
      fraksi={fraksi} onFraksi={setFraksi}
      komisi={komisi} onKomisi={setKomisi}
      dapil={dapil}   onDapil={setDapil}
      onReset={resetFilters}
      onOpenChat={openChat}
    />
  )
}
