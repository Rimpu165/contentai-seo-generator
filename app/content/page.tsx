"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function MyContentPage() {
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
                <Link href="/generate" className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors">Generate Content</Link>
                <Link href="/content" className="text-sm font-medium text-orange-600">My Content</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">My Content 🗂️</h1>
              <p className="text-gray-500 font-medium">All your generated AI content in one place.</p>
            </div>
            <Link href="/generate" className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:border-orange-500 hover:text-orange-600 font-semibold rounded-xl transition-colors shadow-sm">
              + New Content
            </Link>
          </div>
          
          {/* Placeholder Table */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500">
                  <th className="pb-4 font-medium px-4">Title</th>
                  <th className="pb-4 font-medium px-4">Type</th>
                  <th className="pb-4 font-medium px-4">Date</th>
                  <th className="pb-4 font-medium px-4">SEO Score</th>
                  <th className="pb-4 font-medium px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 font-medium text-gray-900 px-4">10 SEO Tips for 2024</td>
                  <td className="py-4 text-gray-500 px-4">Blog Post</td>
                  <td className="py-4 text-gray-500 px-4">Oct 24, 2023</td>
                  <td className="py-4 px-4"><span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md font-medium text-xs">92/100</span></td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-blue-500 hover:text-blue-600 font-medium mr-4">Edit</button>
                    <button className="text-red-500 hover:text-red-600 font-medium">Delete</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 font-medium text-gray-900 px-4">Why Next.js is fast</td>
                  <td className="py-4 text-gray-500 px-4">Newsletter</td>
                  <td className="py-4 text-gray-500 px-4">Oct 21, 2023</td>
                  <td className="py-4 px-4"><span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md font-medium text-xs">88/100</span></td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-blue-500 hover:text-blue-600 font-medium mr-4">Edit</button>
                    <button className="text-red-500 hover:text-red-600 font-medium">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
