'use client';

import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { Sidebar } from '@/components/ui/sidebar';
import { DashboardCards } from '@/components/ui/dashboard-cards';

interface JwtPayload {
  name: string;
  email: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-3xl font-semibold mb-4 text-violet-700">Dashboard</h1>
        <p className="text-gray-600 mb-6">Selamat datang, <span className="font-bold">{user?.name}</span></p>
        <DashboardCards />
      </main>
    </div>
  );
}
