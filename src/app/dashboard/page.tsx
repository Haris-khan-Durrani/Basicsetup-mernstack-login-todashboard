"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Building2, CalendarClock, CalendarX2, FileCheck2, FileClock, type LucideIcon } from 'lucide-react';
import type { Company } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const companies: Company[] = [
  { id: 1, name: "Innovate Inc.", status: 'submitted', dateAdded: '2024-07-15T10:00:00Z', expirationDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 2, name: "Solutions Corp.", status: 'pending', dateAdded: '2024-07-20T10:00:00Z', expirationDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 3, name: "Tech Geniuses", status: 'submitted', dateAdded: '2024-06-01T10:00:00Z', expirationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 4, name: "Future Forward", status: 'pending', dateAdded: '2024-07-25T10:00:00Z', expirationDate: '2025-01-15T10:00:00Z' },
  { id: 5, name: "Synergy Systems", status: 'submitted', dateAdded: '2024-07-26T10:00:00Z', expirationDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 6, name: "Old Ventures", status: 'submitted', dateAdded: '2023-01-01T10:00:00Z', expirationDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString() },
];

const today = new Date();
const thirtyDaysFromNow = new Date();
thirtyDaysFromNow.setDate(today.getDate() + 30);

const stats = {
  newlyAdded: companies.filter(c => {
    const addedDate = new Date(c.dateAdded);
    const diffTime = Math.abs(today.getTime() - addedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  }).length,
  docsPending: companies.filter(c => c.status === 'pending').length,
  docsSubmitted: companies.filter(c => c.status === 'submitted').length,
  upcomingExpired: companies.filter(c => {
    const expiryDate = new Date(c.expirationDate);
    return expiryDate > today && expiryDate <= thirtyDaysFromNow;
  }).length,
  totalExpired: companies.filter(c => new Date(c.expirationDate) < today).length,
};

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <Card className="dashboard-card opacity-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        '.dashboard-card',
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard title="Newly Added" value={stats.newlyAdded} icon={Building2} />
        <StatCard title="Documents Pending" value={stats.docsPending} icon={FileClock} />
        <StatCard title="Submitted Documents" value={stats.docsSubmitted} icon={FileCheck2} />
        <StatCard title="Upcoming Expired (30d)" value={stats.upcomingExpired} icon={CalendarClock} />
        <StatCard title="Total Expired" value={stats.totalExpired} icon={CalendarX2} />
      </div>
    </div>
  );
}
