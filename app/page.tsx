'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import EventDetails from '@/components/landing/EventDetails'
import ProblemStatements from '@/components/landing/ProblemStatements'
import Timeline from '@/components/landing/Timeline'
import JudgingCriteria from '@/components/landing/JudgingCriteria'
import OrganizersSection from '@/components/landing/OrganizersSection'
import Footer from '@/components/landing/Footer'
import AuthModal from '@/components/auth/AuthModal'
import IntroScreen from '@/components/landing/IntroScreen'

export default function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false)
  const [phase, setPhase] = useState<'intro' | 'transitioning' | 'landing'>('intro')

  // Prevent scrolling while intro is active
  useEffect(() => {
    if (phase !== 'landing') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [phase])

  const handleIntroComplete = () => {
    // Phase 1: Start the exit animation (intro still mounted)
    setPhase('transitioning')
    // Phase 2: After intro exit animation finishes, fully unmount intro and mount hero model
    setTimeout(() => setPhase('landing'), 1500)
  }

  return (
    <main>
      {/* Intro is fully unmounted once we reach 'landing' phase — frees the WebGL context */}
      {phase !== 'landing' && (
        <IntroScreen onEnter={handleIntroComplete} />
      )}
      
      <div style={{ opacity: phase === 'landing' ? 1 : 0, transition: 'opacity 0.6s ease-in' }}>
        <Navbar onAssemble={() => setAuthOpen(true)} />
        {/* Hero model only mounts when intro is fully gone — prevents WebGL context crash */}
        <HeroSection onAssemble={() => setAuthOpen(true)} showModel={phase === 'landing'} />
        <ProblemStatements />
        <EventDetails />
        <Timeline />
        <JudgingCriteria />
        <OrganizersSection />
        <Footer />
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
    </main>
  )
}
