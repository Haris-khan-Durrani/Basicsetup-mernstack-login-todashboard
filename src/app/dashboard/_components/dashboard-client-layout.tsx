
"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { DashboardNav } from './dashboard-nav';
import { GlobalLoader } from './global-loader';


export function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, clear session/token here
    router.push('/login');
  };

  return (
    <>
      <GlobalLoader />
      <Sidebar collapsible="icon" className="border-sidebar-border">
        <SidebarHeader className="h-20 items-center justify-center p-2 group-data-[collapsible=icon]:h-14 group-data-[collapsible=icon]:p-0">
          <div className="flex items-center justify-center bg-white rounded-full p-1 size-12 transition-all group-data-[collapsible=icon]:size-10">
            <Image 
              src="https://netxsites.com/wp-content/uploads/2025/05/favicon-netxsite-logo-removebg-preview-150x150.png" 
              alt="ProcessPulse Logo" 
              width={40} 
              height={40}
              className="transition-all"
            />
          </div>
          <div className="font-bold text-lg text-sidebar-foreground transition-opacity group-data-[collapsible=icon]:opacity-0">ProcessPulse</div>
        </SidebarHeader>
        <SidebarContent>
            <DashboardNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-card px-4">
           <div className="flex items-center gap-2">
             <SidebarTrigger className="md:hidden" />
            <h1 className="text-lg font-semibold">Welcome to ProcessPulse</h1>
          </div>
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
