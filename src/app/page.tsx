/**
 * Main Application Page
 * 
 * Gold Standard: Clean separation of concerns.
 * Main page is a thin orchestration layer.
 */

'use client'

import React, { useState } from 'react'
import { Tabs, ErrorBoundary } from '@/components/ui'
import { 
  SearchTab, 
  VerifyTab, 
  DiscoverTab, 
  FeedbackTab,
  AboutTab,
  RankingsSidebar, 
  SettingsModal 
} from '@/components/features'
import { EmailPopup } from '@/components/common'
import { useTheme, useEmailPopup, useTextToSpeech, useProfessionalMode } from '@/hooks'
import { TABS, APP_NAME, APP_TAGLINE } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { TabId } from '@/types'

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('search')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { isDarkMode, toggleDarkMode } = useTheme()
  const { showPopup, submitEmail, dismissPopup } = useEmailPopup()
  const { isSupported: ttsSupported, isSpeaking, stop: stopSpeaking } = useTextToSpeech()
  const { isEnabled: professionalMode } = useProfessionalMode()
  
  return (
    <div className={cn(
      'min-h-screen transition-colors duration-300',
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    )}>
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
              {APP_NAME}
              {professionalMode && (
                <span className="text-xs px-2 py-0.5 bg-blue-600 rounded-full">PRO</span>
              )}
            </h1>
            <p className="text-gray-400 text-sm">{APP_TAGLINE}</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Stop Speaking Button (when TTS is active) */}
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="p-2 text-red-400 hover:text-red-300 transition-colors animate-pulse"
                aria-label="Stop speaking"
              >
                🔊
              </button>
            )}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            
            {/* Settings */}
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Open settings"
            >
              ⚙️
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Column - Main Content */}
          <div className="flex-1 min-w-0">
            {/* Navigation Tabs */}
            <Tabs
              tabs={TABS}
              activeTab={activeTab}
              onTabChange={(id) => setActiveTab(id as TabId)}
              className="mb-6"
            />
            
            {/* Tab Content */}
            <ErrorBoundary>
              <div role="tabpanel" id={`tabpanel-${activeTab}`} aria-labelledby={activeTab}>
                {activeTab === 'search' && <SearchTab />}
                {activeTab === 'check' && <VerifyTab />}
                {activeTab === 'discover' && <DiscoverTab />}
                {activeTab === 'feedback' && <FeedbackTab />}
                {activeTab === 'about' && <AboutTab />}
              </div>
            </ErrorBoundary>
          </div>
          
          {/* Right Column - Rankings Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <RankingsSidebar />
            
            {/* Quick Stats */}
            <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <h4 className="font-semibold text-gray-300 text-sm mb-2">Quick Info</h4>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• Powered by Claude AI + Web Search</li>
                <li>• Prioritizes .edu, .gov sources</li>
                <li>• No data stored, fully private</li>
                {ttsSupported && <li>• Read-aloud available 🔊</li>}
              </ul>
            </div>
          </aside>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-700 mt-12 py-6 text-center text-gray-500 text-sm">
        <p>
          {APP_NAME} — The trust layer for the AI era.
          <br />
          <span className="text-gray-600">
            We show you the sources so you can verify for yourself.
          </span>
        </p>
      </footer>
      
      {/* Modals */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <EmailPopup isOpen={showPopup} onSubmit={submitEmail} onDismiss={dismissPopup} />
    </div>
  )
}
