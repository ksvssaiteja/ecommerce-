import React from 'react';
import { Home, Grid, ShoppingBag, Heart, User, Settings } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  cartCount: number;
  wishlistCount: number;
  isAdmin?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  isAdmin = false,
}) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'catalog' as TabType, label: 'Catalog', icon: Grid },
    { id: 'cart' as TabType, label: 'Cart', icon: ShoppingBag, badge: cartCount },
    { id: 'wishlist' as TabType, label: 'Wishlist', icon: Heart, badge: wishlistCount > 0 ? wishlistCount : undefined },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    ...(isAdmin ? [{ id: 'admin' as TabType, label: 'Admin', icon: Settings }] : []),
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative flex flex-col items-center justify-center min-w-[56px] h-12 rounded-xl transition-all ${
                isActive
                  ? 'text-[#b80035] font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-[22px] h-[22px] transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4px]' : 'stroke-[1.8px]'
                  }`}
                />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-3 px-1.5 py-0.2 bg-[#e11d48] text-white text-[11px] font-bold rounded-full min-w-[17px] text-center leading-tight shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`font-body text-[11px] mt-0.5 tracking-tight ${
                  isActive ? 'font-bold text-[#b80035]' : 'font-medium text-slate-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
