import { LucideIcon, Briefcase, Coffee, Palette } from 'lucide-react';

export interface ProfileTemplate {
  id: string;
  name: string;
  icon: LucideIcon;
  colors: {
    background: string;
    text: string;
    accent: string;
  };
  layout: 'classic' | 'modern' | 'minimal';
}

export const profileTemplates: ProfileTemplate[] = [
  {
    id: 'corporate',
    name: 'Corporate',
    icon: Briefcase,
    colors: {
      background: '#ffffff',
      text: '#333333',
      accent: '#0056b3',
    },
    layout: 'classic',
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: Palette,
    colors: {
      background: '#f0f0f0',
      text: '#2c3e50',
      accent: '#e74c3c',
    },
    layout: 'modern',
  },
  {
    id: 'cafe',
    name: 'Café',
    icon: Coffee,
    colors: {
      background: '#f5e5d5',
      text: '#4a3728',
      accent: '#8b4513',
    },
    layout: 'minimal',
  },
];