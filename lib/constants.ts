// lib/constants.ts

export const EVENT_ID = '23e45f0c-c0a7-4b72-86df-7d9bfb4882aa'

export const EVENT = {
  name: 'CODE ENDGAME',
  fest: 'TECHTRIX 2026',
  college: 'RCC Institute of Information Technology',
  city: 'Kolkata',
  registrationFee: 150,
  prizePool: 5000,
  prizes: [
    { rank: 1, amount: 2500, label: '1st Place', stone: 'mind' },
    { rank: 2, amount: 1500, label: '2nd Place', stone: 'space' },
    { rank: 3, amount: 1000, label: '3rd Place', stone: 'time' },
  ],
  teamSize: { min: 2, max: 4 },
  phases: {
    online: '48 Hours (Online)',
    offline: '8 Hours (Offline Finale)',
  },
}

export const ORGANIZERS = {
  convenors: [
    { name: 'Pratyush Pal', phone: '9330096004', year: '4th Year' },
    { name: 'Palas Saha', phone: '9073743988', year: '4th Year' },
  ],
  coordinators: [
    { name: 'Rajarshi Mondal', phone: '6290492144', year: '3rd Year' },
    { name: 'Anirban Majumder', phone: '6296613379', year: '3rd Year' },
  ],
  volunteers: [
    { name: 'Yashasvi', phone: '8709167408', year: '2nd Year' },
    { name: 'Debajit Pal', phone: '7044895962', year: '2nd Year' },
    { name: 'Ishita Chowdhury', phone: '8334809670', year: '2nd Year' },
  ],
}

export const JUDGING_CRITERIA = [
  { label: 'Innovation & Creativity',    weight: 20, stone: 'power' },
  { label: 'Technical Complexity',       weight: 20, stone: 'space' },
  { label: 'UI/UX & Usability',          weight: 15, stone: 'mind' },
  { label: 'Scalability & Feasibility',  weight: 15, stone: 'time' },
  { label: 'Impact & Practicality',      weight: 15, stone: 'reality' },
  { label: 'Presentation & Demo',        weight: 15, stone: 'soul' },
]

export const ADMIN_PIN = 'ENDGAME2026'

// Server-side gate. Only these emails can load /admin (in addition to the PIN UX gate).
export const ADMIN_EMAILS = [
  'cse2023204@rcciit.org.in',
].map(e => e.toLowerCase())

export const STONE_CSS_VARS: Record<string, string> = {
  space:   'var(--stone-space)',
  mind:    'var(--stone-mind)',
  reality: 'var(--stone-reality)',
  power:   'var(--stone-power)',
  time:    'var(--stone-time)',
  soul:    'var(--stone-soul)',
}

export const STONE_HEX: Record<string, string> = {
  space:   '#00b8ff',
  mind:    '#f0d93a',
  reality: '#e8283a',
  power:   '#b026ff',
  time:    '#ff7b00',
  soul:    '#ff4e00',
}
