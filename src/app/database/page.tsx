'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DatabasePage() {
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const verifications = [
    { id: 'ver_001', type: 'Resume', claims: 5, verified: 4, status: 'PARTIAL', confidence: 87, date: '2 hours ago' },
    { id: 'ver_002', type: 'Bio', claims: 3, verified: 3, status: 'VERIFIED', confidence: 94, date: '5 hours ago' },
    { id: 'ver_003', type: 'Resume', claims: 8, verified: 2, status: 'UNVERIFIED', confidence: 45, date: '1 day ago' },
    { id: 'ver_004', type: 'Resume', claims: 4, verified: 4, status: 'VERIFIED', confidence: 98, date: '1 day ago' },
    { id: 'ver_005', type: 'Claims', claims: 2, verified: 1, status: 'PARTIAL', confidence: 72, date: '2 days ago' },
    { id: 'ver_006', type: 'Resume', claims: 6, verified: 5, status: 'PARTIAL', confidence: 85, date: '3 days ago' },
  ];

  const stats = [
    { label: 'Total Verifications', value: '1,247' },
    { label: 'Claims Checked', value: '8,932' },
    { label: 'Avg. Confidence', value: '89%' },
    { label: 'Fraud Detected', value: '23%' },
  ];

  return (
    <div className={`min-h-screen font-sans ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b ${isDark ? 'bg-gray-950/95 border-gray-800 backdrop-blur-md' : 'bg-white/95 border-gray-200 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold">Trustie</span>
            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">NEW</span>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsDark(!isDark)} className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}>
              {isDark ? '☀️' : '🌙'}
            </button>
            <Link href="/app" className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl">
              Try Free
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Verification Database</h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Your verification history and analytics</p>
          </div>
          <Link href="/app" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl">
            + New Verification
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className={`rounded-xl p-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
              <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className={`flex items-center gap-3 rounded-xl border px-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <svg className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search verifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-1 py-3 bg-transparent outline-none ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
            />
          </div>
        </div>

        {/* Table */}
        <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border border-gray-200'}`}>
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'border-gray-800 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <th className={`text-left py-4 px-6 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>ID</th>
                <th className={`text-left py-4 px-6 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Type</th>
                <th className={`text-left py-4 px-6 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Claims</th>
                <th className={`text-left py-4 px-6 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Status</th>
                <th className={`text-left py-4 px-6 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Confidence</th>
                <th className={`text-left py-4 px-6 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Date</th>
                <th className={`text-left py-4 px-6 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {verifications.map((v) => (
                <tr key={v.id} className={`border-b last:border-b-0 ${isDark ? 'border-gray-800 hover:bg-gray-800/30' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <td className={`py-4 px-6 font-mono text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{v.id}</td>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{v.type}</td>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{v.verified}/{v.claims}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      v.status === 'VERIFIED' ? 'bg-green-500/20 text-green-500' :
                      v.status === 'UNVERIFIED' ? 'bg-red-500/20 text-red-500' :
                      'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{v.confidence}%</td>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{v.date}</td>
                  <td className="py-4 px-6">
                    <button className="text-blue-500 hover:text-blue-400 text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State Note */}
        <p className={`text-center mt-8 text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
          This is sample data. <Link href="/app" className="text-blue-500 hover:text-blue-400">Run a verification</Link> to see your real results.
        </p>
      </main>
    </div>
  );
}
