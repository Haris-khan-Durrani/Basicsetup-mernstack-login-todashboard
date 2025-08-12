
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Workflow } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { DashboardNav } from './dashboard-nav';


export function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, clear session/token here
    router.push('/login');
  };

  return (
    <>
      <Sidebar collapsible="icon" className="border-sidebar-border">
        <SidebarHeader className="h-14 items-center justify-center p-2 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:p-0">
          <Workflow className="size-7 text-sidebar-foreground transition-all group-data-[collapsible=icon]:size-6" />
          <div className="font-bold text-lg text-sidebar-foreground transition-opacity group-data-[collapsible=icon]:opacity-0">ProcessPulse</div>
        </SidebarHeader>
        <SidebarContent>
            <DashboardNav />
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
    </>
  );
}
