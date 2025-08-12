"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  CalendarClock,
  FilePlus2,
  FolderArchive,
  LayoutDashboard,
  LogOut,
  Workflow,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, clear session/token here
    router.push('/login');
  };

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/initiate', icon: FilePlus2, label: 'Initiate Process' },
    { href: '/dashboard/submitted', icon: FolderArchive, label: 'All Submitted' },
    { href: '/dashboard/expiring', icon: CalendarClock, label: 'Upcoming Expired' },
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-sidebar-border">
        <SidebarHeader className="h-14 items-center justify-center p-2 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:p-0">
          <Workflow className="size-7 text-sidebar-foreground transition-all group-data-[collapsible=icon]:size-6" />
          <div className="font-bold text-lg text-sidebar-foreground transition-opacity group-data-[collapsible=icon]:opacity-0">ProcessPulse</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    as="a"
                    size="sm"
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-card px-4">
          <h1 className="text-lg font-semibold">Welcome to ProcessPulse</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
