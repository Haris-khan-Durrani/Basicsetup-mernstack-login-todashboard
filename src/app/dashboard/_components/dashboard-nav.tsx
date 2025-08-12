
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import {
  CalendarClock,
  FilePlus2,
  FolderArchive,
  LayoutDashboard,
  Settings,
  Link as LinkIcon,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { useCustomPages } from '@/hooks/use-custom-pages';
import { useNavigationLoader } from '@/hooks/use-navigation-loader';

const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/initiate', icon: FilePlus2, label: 'Initiate Process' },
    { href: '/dashboard/submitted', icon: FolderArchive, label: 'All Submitted' },
    { href: '/dashboard/expiring', icon: CalendarClock, label: 'Upcoming Expired' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export function DashboardNav() {
    const pathname = usePathname();
    const { customPages } = useCustomPages();
    const { setIsNavigating } = useNavigationLoader();
    const { setOpenMobile, isMobile } = useSidebar();

    useEffect(() => {
        // When the pathname changes, it means navigation is complete.
        setIsNavigating(false);
    }, [pathname, setIsNavigating]);
    
    const handleNavigation = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname !== href) {
        setIsNavigating(true);
      }
      if (isMobile) {
        setOpenMobile(false);
      }
    };

    return (
         <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  as={Link}
                  href={item.href}
                  size="sm"
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                  onClick={handleNavigation(item.href)}
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
                  onClick={handleNavigation(`/dashboard/iframe/${page.slug}`)}
                >
                  <LinkIcon />
                  <span>{page.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
    )
}
