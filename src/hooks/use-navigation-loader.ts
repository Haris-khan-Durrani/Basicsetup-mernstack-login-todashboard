
import { create } from 'zustand';

interface NavigationLoaderState {
  isNavigating: boolean;
  setIsNavigating: (isNavigating: boolean) => void;
}

export const useNavigationLoader = create<NavigationLoaderState>((set) => ({
  isNavigating: false,
  setIsNavigating: (isNavigating) => set({ isNavigating }),
}));
