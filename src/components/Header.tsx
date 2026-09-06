import React from 'react';
import { Bell, LogOut } from 'lucide-react';
import { BRAND_ASSETS } from '../data/shoes';
import { TabType, NotificationItem } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  isAdmin?: boolean;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  notifications,
  onOpenNotifications,
  isAdmin = false,
  onLogout,
}) => {
  const unreadCount = notifications.filter((n) => n.unread).length;

  const getSubtext = () => {
    switch (activeTab) {
      case 'catalog':
        return 'CATALOG';
      case 'cart':
        return 'MY CART';
      case 'wishlist':
        return 'WISHLIST';
      case 'profile':
        return 'ACCOUNT';
      case 'home':
      default:
        return 'HOME';
    }
  };

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between gap-3">
        {/* Brand Mark & App Name */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 min-w-0 flex-1 text-left focus:outline-none"
        >
          <img
            alt="Sunitha ShoeMart Brand Mark"
            className="h-8 w-auto object-contain shrink-0"
            src={BRAND_ASSETS.logo}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-display font-bold text-[19px] tracking-tight truncate text-slate-900 leading-none">
              Sunitha ShoeMart
            </span>
            <span className="font-body text-[11px] text-[#b80035] font-bold uppercase tracking-wider leading-tight mt-0.5">
              {isAdmin && activeTab === 'admin' ? 'ADMIN' : getSubtext()}
            </span>
          </div>
        </button>

        {/* Right Action Icons: Notification Bell & Profile Avatar */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            id="notification-bell-btn"
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-[22px] h-[22px]" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e11d48] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#e11d48]"></span>
              </span>
            )}
          </button>

          <button
            id="profile-avatar-btn"
            aria-label="Profile Account"
            onClick={() => setActiveTab('profile')}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-transform active:scale-95 ${
              activeTab === 'profile' ? 'ring-2 ring-[#e11d48]' : 'hover:ring-2 hover:ring-slate-200'
            }`}
          >
            <img
              alt="Profile Avatar"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#ffdada]"
              src={BRAND_ASSETS.avatar}
              referrerPolicy="no-referrer"
            />
          </button>

          {onLogout && (
            <button
              aria-label="Sign out"
              onClick={onLogout}
              className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:text-[#b80035] hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-[19px] h-[19px]" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
