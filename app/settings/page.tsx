"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 shadow-md shadow-orange-500/20">
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M14 4L4 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><path d="M5 4H14V13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span className="text-xl font-bold tracking-tight">Content<span className="text-orange-500">AI</span></span>
              </Link>
            </div>
            <Link href="/dashboard" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">Settings ⚙️</h1>
          
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                <div>
                  <h3 className="font-medium text-gray-900">Email Address</h3>
                  <p className="text-sm text-gray-500">john@example.com</p>
                </div>
                <button className="text-sm font-medium text-orange-500 hover:text-orange-600">Change</button>
              </div>
              <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                <div>
                  <h3 className="font-medium text-gray-900">Current Plan</h3>
                  <p className="text-sm text-gray-500">Free Plan (3/5 generations used)</p>
                </div>
                <button className="text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors">Upgrade</button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-red-600">Delete Account</h3>
                  <p className="text-sm text-gray-500">Permanently delete your account and all data.</p>
                </div>
                <button className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-lg transition-colors">Delete</button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
