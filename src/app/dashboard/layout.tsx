"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  CalendarClock,
  FilePlus2,
  FolderArchive,
  LayoutDashboard,
  LogOut,
  Settings,
  Workflow,
  Link as LinkIcon,
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
import { CustomPage, useCustomPages } from '@/hooks/use-custom-pages';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { customPages } = useCustomPages();

  const handleLogout = () => {
    // In a real app, clear session/token here
    router.push('/login');
  };

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/initiate', icon: FilePlus2, label: 'Initiate Process' },
    { href: '/dashboard/submitted', icon: FolderArchive, label: 'All Submitted' },
    { href: '/dashboard/expiring', icon: CalendarClock, label: 'Upcoming Expired' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
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
                <SidebarMenuButton
                  as={Link}
                  href={item.href}
                  size="sm"
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
             {customPages.map((page) => (
              <SidebarMenuItem key={page.slug}>
                 <SidebarMenuButton
                  as={Link}
                  href={`/dashboard/iframe/${page.slug}`}
                  size="sm"
                  isActive={pathname === `/dashboard/iframe/${page.slug}`}
                  tooltip={{ children: page.title }}
                >
                  <LinkIcon />
                  <span>{page.title}</span>
                </SidebarMenuButton>
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
