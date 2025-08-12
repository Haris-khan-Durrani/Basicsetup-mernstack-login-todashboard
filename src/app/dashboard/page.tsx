"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Building2, CalendarClock, CalendarX2, FileCheck2, FileClock, type LucideIcon } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, LineChart, Line, PieChart, Pie, Tooltip as RechartsTooltip, Cell, Legend } from "recharts"
import type { Company } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

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

const barChartData = [
  { status: "Pending", count: stats.docsPending, fill: "hsl(var(--chart-1))" },
  { status: "Submitted", count: stats.docsSubmitted, fill: "hsl(var(--chart-2))" },
];

const barChartConfig = {
  count: {
    label: "Count",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-1))",
  },
  submitted: {
    label: "Submitted",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const monthlyAdditionsData = companies.reduce((acc, company) => {
  const month = new Date(company.dateAdded).toLocaleString('default', { month: 'short', year: '2-digit' });
  const existing = acc.find(item => item.month === month);
  if (existing) {
    existing.count++;
  } else {
    acc.push({ month, count: 1 });
  }
  return acc;
}, [] as { month: string, count: number }[]).sort((a,b) => new Date('1 ' + a.month) > new Date('1 ' + b.month) ? 1: -1);


const lineChartConfig = {
  count: {
    label: "Companies",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

const expirationData = [
    { name: 'Total Expired', value: stats.totalExpired, color: 'hsl(var(--chart-5))', fill: 'hsl(var(--chart-5))' },
    { name: 'Upcoming Expired', value: stats.upcomingExpired, color: 'hsl(var(--chart-4))', fill: 'hsl(var(--chart-4))' },
]

const pieChartConfig = {
    value: { label: 'Count' },
    "Total Expired": { label: "Total Expired", color: 'hsl(var(--chart-5))' },
    "Upcoming Expired": { label: "Upcoming Expired (30d)", color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig;

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
       gsap.fromTo(
        '.dashboard-chart',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.3,
          stagger: 0.2,
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
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="dashboard-chart opacity-0">
            <Card>
            <CardHeader>
                <CardTitle>Document Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={barChartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={barChartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="status"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="count" radius={4} />
                </BarChart>
                </ChartContainer>
            </CardContent>
            </Card>
        </div>
        <div className="dashboard-chart opacity-0">
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Company Additions</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={lineChartConfig} className="min-h-[200px] w-full">
                        <LineChart
                            accessibilityLayer
                            data={monthlyAdditionsData}
                            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="count" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
        <div className="dashboard-chart opacity-0">
             <Card>
                <CardHeader>
                    <CardTitle>Expiration Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={pieChartConfig} className="min-h-[200px] w-full">
                        <PieChart accessibilityLayer>
                            <RechartsTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Pie
                                data={expirationData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="hsl(var(--chart-1))"
                                labelLine={false}
                                label={({ cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                                    const RADIAN = Math.PI / 180;
                                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                    const x = cy + radius * Math.cos(-midAngle * RADIAN);
                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                    return (
                                        <text x={x} y={y} fill="white" textAnchor={x > cy ? 'start' : 'end'} dominantBaseline="central">
                                            {`${(percent * 100).toFixed(0)}%`}
                                        </text>
                                    );
                                }}
                            >
                                {expirationData.map((entry, index) => (
                                     <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <ChartLegend content={<ChartLegendContent payload={expirationData} />} />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
