import { create } from 'zustand';

export interface CustomPage {
  title: string;
  url: string;
  slug: string;
}

interface CustomPagesState {
  customPages: CustomPage[];
  addCustomPage: (page: { title: string; url: string }) => void;
  removeCustomPage: (slug: string) => void;
}

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const useCustomPages = create<CustomPagesState>((set) => ({
  customPages: [],
  addCustomPage: (page) =>
    set((state) => {
      const slug = slugify(page.title);
      if (state.customPages.some(p => p.slug === slug)) {
        // Avoid duplicate slugs
        return state;
      }
      return {
        customPages: [...state.customPages, { ...page, slug }],
      };
    }),
  removeCustomPage: (slug) =>
    set((state) => ({
      customPages: state.customPages.filter((p) => p.slug !== slug),
    })),
}));
