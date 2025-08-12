
"use client";

import { Loader } from '@/components/ui/loader';
import { useNavigationLoader } from '@/hooks/use-navigation-loader';
import { cn } from '@/lib/utils';

export function GlobalLoader() {
  const { isNavigating } = useNavigationLoader();

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300',
        isNavigating ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <Loader />
    </div>
  );
}
