const days = [
  {
    id: 1,
    title: 'Cape Reinga → Twilight Beach',
    km: 12,
    unlockAtKm: 0,
    unlockLabel: 'Cape Reinga',
    narrative: "This is Te Rerenga Wairua — where spirits leave the world by an old tree's roots. You're taking the long way down.",
    facts: [
      { icon: '⚠️', label: 'Cross Te Werahi Beach at low tide — rocks dangerous at high water' },
      { icon: '🏕️', label: 'Camp: Twilight Beach' }
    ]
  },
  {
    id: 2,
    title: 'Twilight Beach → Maunganui Bluff',
    km: 28,
    unlockAtKm: 12,
    unlockLabel: 'Twilight Beach',
    narrative: "This is Te Oneroa-a-Tōhē — the long beach of Tōhē, said to have walked every inch of it. You're in old company now.",
    facts: [
      { icon: '🚱', label: 'Water scarce or unreliable — fill up at camp' },
      { icon: '🚗', label: 'Vehicle access at Te Paki Stream' },
      { icon: '🏕️', label: 'Camp: Maunganui Bluff (~40 km mark)' }
    ]
  },
  {
    id: 3,
    title: 'Maunganui Bluff → Hukatere',
    km: 30,
    unlockAtKm: 40,
    unlockLabel: 'Maunganui Bluff',
    narrative: "Tōhē's road doesn't change. Neither should your pace.",
    facts: [
      { icon: '📍', label: 'Hukatere landmark near the 70 km mark' },
      { icon: '🏕️', label: 'Camp: Hukatere Lodge / Utea Park' }
    ]
  },
  {
    id: 4,
    title: 'Hukatere → Ahipara',
    km: 24,
    unlockAtKm: 70,
    unlockLabel: 'Hukatere',
    narrative: "The sand ends. So does the silence.",
    facts: [
      { icon: '📍', label: 'Waipapakauri landmark near the 87 km mark' },
      { icon: '🏕️', label: 'Camp: Waipapakauri Holiday Park, or push on to Ahipara' }
    ]
  }
]

export { days }
