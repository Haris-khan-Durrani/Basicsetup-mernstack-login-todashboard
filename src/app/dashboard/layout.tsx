import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
} from '@/components/ui/sidebar';
import { DashboardNav } from './_components/dashboard-nav';
import { DashboardClientLayout } from './_components/dashboard-client-layout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardClientLayout>
        {children}
      </DashboardClientLayout>
    </SidebarProvider>
  );
}
