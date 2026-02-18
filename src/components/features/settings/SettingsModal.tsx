/**
 * Settings Modal Component
 * 
 * User settings and preferences including accessibility features.
 */

import React, { useState } from 'react'
import { Modal, Button, Tabs, Input } from '@/components/ui'
import { useTheme, useLocalStorage, clearAllLocalData, useTextToSpeech, useProfessionalMode } from '@/hooks'
import { SETTINGS_TABS, STORAGE_KEYS, APP_NAME, APP_VERSION, TTS_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { ThemeMode, SettingsTabId } from '@/types'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<SettingsTabId>('general')
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Settings"
      size="lg"
    >
      <Tabs
        tabs={SETTINGS_TABS}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as SettingsTabId)}
        className="mb-6"
      />
      
      <div className="min-h-[200px]">
        {activeTab === 'general' && <GeneralSettings />}
        {activeTab === 'accessibility' && <AccessibilitySettings />}
        {activeTab === 'privacy' && <PrivacySettings />}
        {activeTab === 'about' && <AboutSettings />}
      </div>
    </Modal>
  )
}

function GeneralSettings() {
  const { themeMode, setThemeMode } = useTheme()
  
  const themes: { value: ThemeMode; label: string }[] = [
    { value: 'light', label: '☀️ Light' },
    { value: 'dark', label: '🌙 Dark' },
    { value: 'auto', label: '💻 System' },
  ]
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Appearance
        </label>
        <div className="flex gap-2">
          {themes.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setThemeMode(value)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                themeMode === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function AccessibilitySettings() {
  const { isSupported: ttsSupported, rate, setRate, speak, isSpeaking, stop } = useTextToSpeech()
  const { isEnabled: professionalMode, toggle: toggleProfessionalMode } = useProfessionalMode()
  
  const testSpeech = () => {
    if (isSpeaking) {
      stop()
    } else {
      speak('This is a test of the text to speech feature. Trustie helps you verify AI content with trusted sources.')
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Text-to-Speech */}
      <div>
        <h4 className="font-medium text-gray-100 mb-3 flex items-center gap-2">
          🔊 Read Aloud
          {!ttsSupported && (
            <span className="text-xs text-amber-400">(Not supported in this browser)</span>
          )}
        </h4>
        
        {ttsSupported && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Speech Rate: {rate.toFixed(1)}x
              </label>
              <input
                type="range"
                min={TTS_CONFIG.minRate}
                max={TTS_CONFIG.maxRate}
                step={0.1}
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Slower</span>
                <span>Faster</span>
              </div>
            </div>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={testSpeech}
            >
              {isSpeaking ? '⏹ Stop' : '▶️ Test Voice'}
            </Button>
            
            <p className="text-gray-500 text-xs">
              Click the 🔊 button on any result to have it read aloud.
            </p>
          </div>
        )}
      </div>
      
      {/* Professional Mode */}
      <div className="pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-100">✨ Professional Writing Mode</h4>
            <p className="text-gray-400 text-sm mt-1">
              Automatically expand contractions (you're → you are)
            </p>
          </div>
          <button
            onClick={toggleProfessionalMode}
            className={cn(
              'relative w-12 h-6 rounded-full transition-colors',
              professionalMode ? 'bg-blue-600' : 'bg-gray-600'
            )}
          >
            <span
              className={cn(
                'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                professionalMode ? 'left-7' : 'left-1'
              )}
            />
          </button>
        </div>
        {professionalMode && (
          <p className="text-emerald-400 text-xs mt-2">
            ✓ Professional mode is active
          </p>
        )}
      </div>
      
      {/* Font Size (future) */}
      <div className="pt-4 border-t border-gray-700">
        <h4 className="font-medium text-gray-400 mb-2">📏 Font Size</h4>
        <p className="text-gray-500 text-sm">
          Use your browser's zoom (Ctrl/Cmd + Plus/Minus) to adjust text size.
        </p>
      </div>
    </div>
  )
}

function PrivacySettings() {
  const [cleared, setCleared] = useState(false)
  
  const handleClearData = () => {
    if (confirm('This will clear all your local data including settings. Continue?')) {
      clearAllLocalData()
      setCleared(true)
      setTimeout(() => window.location.reload(), 1000)
    }
  }
  
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-gray-100 mb-2">🔒 Your Privacy</h4>
        <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-3 mb-4">
          <p className="text-emerald-300 text-sm">
            ✓ We do NOT store your searches or verifications
          </p>
          <p className="text-emerald-300 text-sm">
            ✓ All processing happens in real-time
          </p>
          <p className="text-emerald-300 text-sm">
            ✓ No accounts required, no tracking
          </p>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-100 mb-2">Local Storage</h4>
        <p className="text-gray-400 text-sm mb-3">
          We store preferences locally in your browser only.
        </p>
        <Button
          variant="danger"
          size="sm"
          onClick={handleClearData}
          disabled={cleared}
        >
          {cleared ? '✓ Data Cleared' : 'Clear Local Data'}
        </Button>
      </div>
      
      <div className="pt-4 border-t border-gray-700">
        <h4 className="font-medium text-gray-100 mb-2">What we store locally:</h4>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• Theme preference (light/dark/auto)</li>
          <li>• Read-aloud speed setting</li>
          <li>• Professional writing mode preference</li>
          <li>• Email submission status</li>
        </ul>
      </div>
    </div>
  )
}

function AboutSettings() {
  return (
    <div className="space-y-4">
      <div className="text-center py-4">
        <h3 className="text-2xl font-bold text-gray-100 mb-1">{APP_NAME}</h3>
        <p className="text-blue-400">The Trust Layer for AI Search</p>
        <p className="text-gray-500 text-sm mt-1">Version {APP_VERSION}</p>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-4">
        <p className="text-gray-300 text-sm leading-relaxed">
          Traditional search shows you 10 links and lets you decide what to trust.
          AI search gives you 1 confident answer with no sources.
          Trustie gives you the answer AND the evidence so you can verify for yourself.
        </p>
      </div>
      
      <div className="pt-4 border-t border-gray-700">
        <h4 className="font-medium text-gray-100 mb-2">Built With</h4>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• Next.js 14 + React 18</li>
          <li>• TypeScript (strict mode)</li>
          <li>• Tailwind CSS</li>
          <li>• Claude API for verification</li>
          <li>• Web Speech API for read-aloud</li>
        </ul>
      </div>
      
      <div className="pt-4 border-t border-gray-700">
        <h4 className="font-medium text-gray-100 mb-2">Inspired By</h4>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• Google's PageRank (authority signals)</li>
          <li>• DuckDuckGo (privacy, no filter bubbles)</li>
          <li>• Google Scholar (academic reliability)</li>
          <li>• PubMed (medical research standards)</li>
          <li>• Wolfram Alpha (computational accuracy)</li>
        </ul>
      </div>
    </div>
  )
}

export default SettingsModal
