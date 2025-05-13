'use client';

import { Home, Menu, Users, LogOut } from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-violet-700 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">U-Food</h1>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 hover:text-violet-300">
          <Home size={20} /> Dashboard
        </Link>
        <Link href="/dashboard/restaurants" className="flex items-center gap-2 hover:text-violet-300">
          <Menu size={20} /> Restaurants
        </Link>
        <Link href="/dashboard/users" className="flex items-center gap-2 hover:text-violet-300">
          <Users size={20} /> Users
        </Link>
        <button className="flex items-center gap-2 hover:text-violet-300 mt-auto">
          <LogOut size={20} /> Logout
        </button>
      </nav>
    </aside>
  );
}
