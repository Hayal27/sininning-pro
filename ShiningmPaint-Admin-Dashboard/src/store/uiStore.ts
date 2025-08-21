import { create } from 'zustand';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface UIState {
  sidebarOpen: boolean;
  notifications: Notification[];
  loading: boolean;
  theme: 'light' | 'dark';
}

interface UIActions {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setLoading: (loading: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState & UIActions>((set, get) => ({
  // Initial state
  sidebarOpen: true,
  notifications: [],
  loading: false,
  theme: 'light',

  // Actions
  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open });
  },

  addNotification: (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto remove notification after duration
    const duration = notification.duration || 5000;
    setTimeout(() => {
      get().removeNotification(id);
    }, duration);
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setTheme: (theme: 'light' | 'dark') => {
    set({ theme });
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
  },
}));

// Helper functions for notifications
export const showNotification = {
  success: (title: string, message: string, duration?: number) => {
    useUIStore.getState().addNotification({ title, message, type: 'success', duration });
  },
  error: (title: string, message: string, duration?: number) => {
    useUIStore.getState().addNotification({ title, message, type: 'error', duration });
  },
  warning: (title: string, message: string, duration?: number) => {
    useUIStore.getState().addNotification({ title, message, type: 'warning', duration });
  },
  info: (title: string, message: string, duration?: number) => {
    useUIStore.getState().addNotification({ title, message, type: 'info', duration });
  },
};
