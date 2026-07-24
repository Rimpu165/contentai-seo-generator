"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function GeneratePage() {
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
              <div className="hidden md:flex items-center gap-6">
                <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors">Dashboard</Link>
                <Link href="/generate" className="text-sm font-medium text-orange-600">Generate Content</Link>
                <Link href="/content" className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors">My Content</Link>
              </div>
            </div>
            <Link href="/dashboard" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Generate New Content ✍️</h1>
          <p className="text-gray-500 font-medium mb-8">Let the AI write SEO-optimized content for you.</p>
          
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topic or Keyword</label>
                <input type="text" placeholder="e.g. Best SEO practices in 2024" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                <select className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition">
                  <option>Blog Post</option>
                  <option>Social Media Caption</option>
                  <option>Email Newsletter</option>
                  <option>Product Description</option>
                </select>
              </div>
              <button className="w-full px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 transition-all">
                Generate with AI
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
